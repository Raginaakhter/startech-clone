import { featuredProducts } from "@/data/products";

// Generate more dummy products for detail pages — enough for pagination
const suffixes = ["", " (V2)", " Plus", " Pro", " Lite", " Max", " SE", " Ultra"];
const allProducts = suffixes.flatMap((suffix, si) =>
  featuredProducts.map((p, i) => ({
    ...p,
    id: p.id + si * 100,
    name: p.name + suffix,
    price: Math.round(p.price * (0.85 + si * 0.05)),
    oldPrice: p.oldPrice ? Math.round(p.oldPrice * (0.85 + si * 0.05)) : null,
    href: si === 0 ? p.href : p.href + `-${suffix.trim().toLowerCase().replace(/[() ]/g, "")}`,
  }))
);


import { navigationData } from "@/data/navigation";

export function getProductBySlug(slug) {
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return allProducts.find(
    (p) => p.href === cleanSlug || p.href === slug
  );
}

// Recursively find a category in navigation data
export function getCategoryBySlug(slug) {
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
  
  const findInTree = (nodes) => {
    for (const node of nodes) {
      if (node.href === cleanSlug || node.href === slug) {
        return node;
      }
      if (node.children) {
        const found = findInTree(node.children);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findInTree(navigationData);
}

// Find products matching a category name or keywords
export function getProductsByCategory(category) {
  if (!category) return [];
  const catName = category.name.toLowerCase();
  
  // Keyword mapping for dummy data match
  let keywords = [catName];
  if (catName.includes("laptop")) keywords.push("laptop", "notebook", "macbook");
  if (catName.includes("desktop") || catName.includes("pc")) keywords.push("pc", "computer", "barebone", "desktop");
  if (catName.includes("monitor")) keywords.push("monitor", "display");
  if (catName.includes("ac") || catName.includes("conditioner")) keywords.push("ac", "conditioner", "singer");
  if (catName.includes("phone") || catName.includes("mobile")) keywords.push("phone", "mobile", "iphone", "galaxy", "redmi");
  if (catName.includes("power") || catName.includes("ups")) keywords.push("power", "station", "ups", "ecoflow", "marsriva");
  if (catName.includes("chair")) keywords.push("chair", "gc-907");
  if (catName.includes("projector")) keywords.push("projector");
  if (catName.includes("printer")) keywords.push("printer");
  if (catName.includes("headset") || catName.includes("headphone")) keywords.push("headset", "headphone");
  if (catName.includes("mouse")) keywords.push("mouse");
  if (catName.includes("supply") || catName.includes("cv550")) keywords.push("supply", "corsair", "cv550");
  if (catName.includes("casing")) keywords.push("casing", "mid tower", "tower", "nx410", "ch510", "h5 flow", "td500");
  if (catName.includes("motherboard")) keywords.push("motherboard", "b760m", "b660m", "z790");
  if (catName.includes("graphics") || catName.includes("gpu")) keywords.push("graphics card", "rtx", "geforce", "radeon");
  if (catName.includes("ram") || catName.includes("memory")) keywords.push("ram", "ddr5", "ddr4", "vengeance", "fury beast", "trident");
  if (catName.includes("ssd")) keywords.push("ssd", "nvme", "990 pro", "sn580", "nv2");
  if (catName.includes("keyboard")) keywords.push("keyboard", "mechanical", "mk858", "rk84", "k380");
  if (catName.includes("router")) keywords.push("router", "archer", "wi-fi", "wifi");
  if (catName.includes("switch") || catName.includes("network switch")) keywords.push("switch", "sg1016", "gs108", "fs1010");
  if (catName.includes("smart watch") || catName.includes("watch")) keywords.push("smart watch", "watch", "amazfit", "redmi watch");
  if (catName.includes("speaker")) keywords.push("speaker", "flip 6", "r1280t", "bookshelf");
  if (catName.includes("webcam")) keywords.push("webcam", "c920");
  if (catName.includes("cooler") || catName.includes("cpu cooler")) keywords.push("cooler", "ak620", "h150i");
  if (catName.includes("processor")) keywords.push("processor", "ryzen", "core i5", "core i7");
  if (catName.includes("tablet") || catName.includes("ipad")) keywords.push("tablet", "ipad", "tab s9");
  if (catName.includes("hard disk") || catName.includes("hdd")) keywords.push("hdd", "hard disk");

  const matched = allProducts.filter((p) => {
    const pName = p.name.toLowerCase();
    const pHref = p.href.toLowerCase();
    return keywords.some(kw => pName.includes(kw) || pHref.includes(kw));
  });

  // Fallback to avoid empty category pages (show some products as featured)
  if (matched.length === 0) {
    return allProducts.slice(0, 8);
  }
  return matched;
}


export function getRelatedProducts(currentId, count = 5) {
  return allProducts
    .filter((p) => p.id !== currentId)
    .slice(0, count);
}

export function searchProducts(query) {
  if (!query) return allProducts;
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.href.toLowerCase().includes(q)
  );
}

export function filterProducts({ minPrice, maxPrice, sort }) {
  let results = [...allProducts];

  if (minPrice) {
    results = results.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    results = results.filter((p) => p.price <= Number(maxPrice));
  }

  if (sort === "price-low") {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

// Dummy specs for product details
export function getProductSpecs() {
  return [
    { label: "Brand", value: "Star Tech" },
    { label: "Model", value: "ST-2024-PRO" },
    { label: "Warranty", value: "1 Year Official Warranty" },
    { label: "Country of Origin", value: "China" },
    { label: "Condition", value: "Brand New" },
    { label: "In The Box", value: "Product, Manual, Warranty Card" },
  ];
}
