"use client";
import React, { use } from "react";
import { getProductBySlug, getCategoryBySlug } from "@/data/helpers";
import ProductDetailView from "@/components/ProductDetailView";
import CategoryListView from "@/components/CategoryListView";
import MaintenanceView from "@/components/MaintenanceView";

export default function CatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  // Await the params for compatibility in Next.js 15+
  const resolvedParams = use(params) as { slug?: string[] };
  const slugArray = resolvedParams.slug || [];
  
  // Reconstruct path slug
  const slugPath = slugArray.join("/");

  // Look for product
  const product = getProductBySlug(slugPath);
  if (product) {
    return <ProductDetailView product={product} />;
  }

  // Look for category
  const category = getCategoryBySlug(slugPath);
  if (category) {
    return <CategoryListView category={category} />;
  }

  // Fallback to maintenance page
  return <MaintenanceView />;
}
