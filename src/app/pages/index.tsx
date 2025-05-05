import Link from "next/link";

// Inside your component
<div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Popular Categories</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {["running-shoes", "laptops", "headphones", "kitchen-appliances"].map(
      (cat) => (
        <Link
          href={`/${cat}`}
          key={cat}
          className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-center"
        >
          {cat
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Link>
      )
    )}
  </div>
</div>;
