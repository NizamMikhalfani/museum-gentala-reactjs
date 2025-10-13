import { NextRequest, NextResponse } from 'next/server'
// Use relative imports since path aliases aren’t resolved here
import { requireAdmin } from '../../../../lib/auth'
import { createServerSupabaseClient } from '../../../../lib/supabase'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

// EXIF extraction helper (basic implementation)
async function extractExifData(file: File): Promise<Record<string, unknown>> {
  try {
    // For now, return basic file info
    // In production, you'd use a library like 'exif-parser' or 'sharp'
    return {
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      lastModified: file.lastModified,
      // Add more EXIF data extraction here when you add the library
    };
  } catch (error) {
    console.error('EXIF extraction failed:', error);
    return {};
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  const category = (formData.get('category') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed'
      }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 10MB'
      }, { status: 400 });
    }

    // Extract EXIF data
  const exifData = await extractExifData(file);

  // Generate unique filename
  const timestamp = Date.now();
  const fileExtension = path.extname(file.name) || '.jpg';
  const fileName = `${timestamp}_${Math.random().toString(36).substring(2)}${fileExtension}`;
  // Generate unique ID for the photo record
  const id = randomUUID();

    // Convert File to Buffer for upload
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Upload to Supabase Storage
  const supabase = createServerSupabaseClient();
  // Construct storage path using category folder
  const filePath = `${category}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('photos').getPublicUrl(filePath)

    if (!urlData.publicUrl) {
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 })
    }

    // Save metadata to database
    const photoMetadata: Record<string, unknown> = {
      id,
      title: title || file.name,
      description: description || '',
      category,
      fileName: fileName,
      originalName: file.name,
      url: urlData.publicUrl,
      path: filePath,
      size: file.size,
      mimeType: file.type,
      exifData,
      uploadedBy: session.email,
      uploadedAt: new Date().toISOString(),
    };

    // For now, save to a local JSON file (replace with database in production)
    const photosFilePath = path.join(process.cwd(), 'src', 'data', 'photos.json');

    try {
      // Read existing photos
      let photos: Array<Record<string, unknown>> = []
      try {
        const data = await fs.readFile(photosFilePath, 'utf-8')
        photos = JSON.parse(data) as Array<Record<string, unknown>>
      } catch {
        // File doesn't exist, start with empty array
        photos = []
      }

      // Add new photo
      photos.push(photoMetadata)

      // Write back to file
      await fs.writeFile(photosFilePath, JSON.stringify(photos, null, 2), 'utf-8')
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Don't fail the upload if metadata save fails
    }

    return NextResponse.json({
      success: true,
      photo: photoMetadata
    });

  } catch (error) {
    console.error('Photo upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET endpoint to retrieve photos
export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    // Read photos from file (replace with database query in production)
    const photosFilePath = path.join(process.cwd(), 'src', 'data', 'photos.json');

  let photos: Array<Record<string, unknown>> = [];
    try {
      const data = await fs.readFile(photosFilePath, 'utf-8');
          photos = JSON.parse(data) as Array<Record<string, unknown>>;
    } catch {
      photos = [];
    }

    // Filter by category if specified
    if (category) {
      photos = photos.filter((photo: Record<string, unknown>) => (photo.category as string) === category);
    }

    return NextResponse.json({ photos });

  } catch (error) {
    console.error('Get photos error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
