import { permanentRedirect } from "next/navigation";

type SolutionParams = { slug: string };

export default async function SolutionSlugPage({
  params,
}: {
  params: Promise<SolutionParams>;
}) {
  const { slug } = await params;
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  permanentRedirect(`/products/${encodeURIComponent(normalized)}`);
}
