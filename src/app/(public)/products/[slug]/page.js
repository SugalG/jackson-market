import { getProductBySlug } from "@/lib/db";
import ProductClient from "./product-client";

export default async function ProductDetails(props) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return <ProductClient product={product} />;
}
