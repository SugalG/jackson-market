import PageBanner from "../../PageBanner";
import { getProductBySlug } from "@/lib/db";
import ProductClient from "./product-client";

export default async function ProductDetails(props) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div>
        {/* ✅ STATIC PAGE BANNER */}
        <PageBanner
          title="Product Details"
          breadcrumbBase="Home"
          breadcrumbCurrent="Product"
        />

        <div className="p-6">Product not found</div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ STATIC PAGE BANNER */}
      <PageBanner
        title="Product Details"
        breadcrumbBase="Home"
        breadcrumbCurrent="Product"
      />

      {/* ✅ EXISTING CLIENT COMPONENT (UNCHANGED) */}
      <ProductClient product={product} />
    </div>
  );
}
