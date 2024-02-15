import Link from "next/link";

const Products = () => {
  return (
    <div>
        <Link 
        href={'/dashboard/products/new'}
        className="btn-primary">
            Add new product
        </Link>
    </div>
  )
}

export default Products;
