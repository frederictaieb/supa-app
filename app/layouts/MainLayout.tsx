import Navbar from '../components/Navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}