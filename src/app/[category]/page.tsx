import React from "react";
import Link from "next/link";

const DEFAULT_CATEGORIES = ["running", "headphones", "LEGO", "electronics"];

// Server Component that receives params
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  // This is a server component, so we can fetch data directly
  // In a real implementation, you'd call your Amazon API here
  const products = await fetchProductsByCategory(category);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Today's Deals on {category.replace(/-/g, " ")}
      </h1>

      {DEFAULT_CATEGORIES.map((category, i) => {
        return (
          <Link
            key={`${category}_${i}`}
            href={`/${category}`}
            className="text-blue-600 hover:underline m-6 inline-block capitalize"
          >
            {category}
          </Link>
        );
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {products.map((product) => {
          const discountPercent = Math.floor(
            (1 - product.currentPrice / product.originalPrice) * 100
          );
          console.log({ discountPercent });
          return (
            <div
              key={product.id}
              className={`relative rounded-xl overflow-hidden shadow-lg backdrop-blur-md bg-white/10 border
                border-white/50
                hover:bg-white/25 transition-all duration-300`} //  border-white/20
            >
              <img
                src={
                  product.productImageUrl ??
                  "https://via.assets.so/shoe.png?id=1&q=95&w=180&h=180&fit=fill"
                }
                alt={product.title}
                className="w-full object-cover"
              />
              <span className="absolute top-2 left-2 px-1.5 py-1 bg-red-800 text-white rounded-sm">{`${discountPercent}%`}</span>
              {/* Product card content */}
              <div className="p-4">
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-red-600 font-medium text-xl">
                    ${product.currentPrice}
                  </span>
                  <span className="text-gray-500">
                    RRP:
                    <span className="line-through">
                      ${product.originalPrice}
                    </span>
                  </span>
                </div>
                <Link href={product.url} className="font-semibold">
                  {product.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const FALLBACK_URL = "https://www.google.com";
// Mock function - TODO - replace with actual API call
async function fetchProductsByCategory(category: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return [
    {
      id: "1",
      title: `${category} Product 1`,
      originalPrice: 99.99,
      currentPrice: 79.99,
      url: FALLBACK_URL,
      productImageUrl: undefined,
    },
    {
      id: "2",
      title: `${category} Product 2`,
      originalPrice: 149.99,
      currentPrice: 119.99,
      url: FALLBACK_URL,
      productImageUrl: undefined,
    },
    {
      id: "3",
      title: `${category} Product 3`,
      originalPrice: 139.99,
      currentPrice: 99.99,
      url: FALLBACK_URL,
      productImageUrl: undefined,
    },
    // More products...
  ];
}
