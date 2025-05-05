import React from "react";
import Link from "next/link";

const DEFAULT_CATEGORIES = ["running", "headphones", "LEGO", "electronics"];

// Server Component that receives params
export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  // This is a server component, so we can fetch data directly
  // In a real implementation, you'd call your Amazon API here
  const products = await fetchProductsByCategory(category);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Today's Deals on {category.replace(/-/g, " ")}
      </h1>

      {DEFAULT_CATEGORIES.map((category) => {
        return (
          <Link
            href={`/${category}`}
            className="text-blue-600 hover:underline m-6 inline-block capitalize"
          >
            {category}
          </Link>
        );
      })}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product card content */}
            <div className="p-4">
              <h2 className="font-semibold">{product.title}</h2>
              <div className="mt-2 flex justify-between">
                <span className="text-red-600 font-medium">
                  ${product.currentPrice}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// Mock function - replace with actual API call
async function fetchProductsByCategory(category: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock data
  return [
    {
      id: "1",
      title: `${category} Product 1`,
      originalPrice: 99.99,
      currentPrice: 79.99,
    },
    {
      id: "2",
      title: `${category} Product 2`,
      originalPrice: 149.99,
      currentPrice: 119.99,
    },
    {
      id: "3",
      title: `${category} Product 3`,
      originalPrice: 139.99,
      currentPrice: 99.99,
    },
    // More products...
  ];
}
