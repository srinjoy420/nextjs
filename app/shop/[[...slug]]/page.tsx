import { Suspense } from 'react'

async function ShopContent({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params

  return <p>{slug ? slug.join(' / ') : 'All products'}</p>
}

export default function Shop({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  return (
    <div>
      <h1>shop</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ShopContent params={params} />
      </Suspense>
    </div>
  )
}