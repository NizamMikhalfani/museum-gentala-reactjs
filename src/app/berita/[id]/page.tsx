import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import beritaData from "@/data/berita.json";
import beritaImages from "@/lib/beritaImages";

type Artikel = {
	id: string;
	title: string;
	excerpt?: string;
	imageUrl?: string;
	href?: string;
	// add more fields if needed
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
	const items = (beritaData as unknown as Artikel[]).map((a) => ({ id: a.id }));
	return items;
}

export default async function BeritaDetail(props: { params: Promise<{ id: string }> }) {
	const params = await props.params;
	const { id } = params;
	const articles = beritaData as unknown as Artikel[];
	const artikel = articles.find((a) => a.id === id);

	if (!artikel) {
		return notFound();
	}

	// pick image by id from central mapping, fallback to artikel.imageUrl or a placeholder
	const imageSrc = beritaImages[artikel.id] ?? artikel.imageUrl ?? "/images/placeholder.png";

	return (
		<main className="max-w-4xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-bold mb-4">{artikel.title}</h1>

			<div className="w-full h-[420px] relative mb-6 rounded overflow-hidden bg-gray-100">
								{/* if imageSrc is a string URL, Image accepts it; if it's StaticImageData it also works */}
								<Image src={imageSrc as unknown as string} alt={artikel.title} fill className="object-cover" />
			</div>

			{artikel.excerpt && <p className="text-gray-700 mb-6">{artikel.excerpt}</p>}

			<div className="mt-8">
				<Link href="/berita" className="text-sm text-blue-600 hover:underline">
					← Kembali ke Berita
				</Link>
			</div>
		</main>
	);
}
