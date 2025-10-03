import Image from "next/image";
import beritaData from "@/data/berita.json";

type Artikel = {
	id: string;
	title: string;
	excerpt: string;
	imageUrl: string;
	href?: string;
};

export function generateStaticParams(): { id: string }[] {
	const items = (beritaData as unknown as Artikel[]).map((a) => ({ id: a.id }));
	return items;
}

export default async function BeritaDetail(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const articles = beritaData as unknown as Artikel[];
	const artikel = articles.find((a) => a.id === id);

	if (!artikel) {
		return (
			<div className="max-w-3xl mx-auto px-6 py-16">
				<h1 className="text-2xl font-bold">Artikel tidak ditemukan</h1>
			<p className="mt-2 text-gray-600">ID: {id}</p>
			</div>
		);
	}

	const imgSrc = imageById[artikel.id];

	return (
		<article className="max-w-3xl mx-auto px-6 py-12">
			<h1 className="text-3xl font-bold mb-4">{artikel.title}</h1>
			{imgSrc && (
				<div className="mb-6">
					<Image src={imgSrc} alt={artikel.title} className="w-full h-auto" unoptimized />
				</div>
			)}
			<p className="text-lg text-gray-700 leading-relaxed">{artikel.excerpt}</p>
		</article>
	);
}
