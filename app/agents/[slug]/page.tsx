import { notFound } from "next/navigation";
import { AGENTS } from "@/lib/data";
import { AgentDetailClient } from "./AgentDetailClient";
import type { Metadata } from "next";

export function generateStaticParams() {
  return AGENTS.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = AGENTS.find((a) => a.id === slug);
  if (!agent) return {};
  return {
    title: `${agent.name} — ${agent.title} | Aion Labs`,
    description: agent.description,
  };
}

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = AGENTS.find((a) => a.id === slug);
  if (!agent) notFound();

  return <AgentDetailClient agent={agent} />;
}
