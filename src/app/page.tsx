'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [role, setRole] = useState<'customer' | 'admin' | null>(null)
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [adminUser, setAdminUser] = useState('')
  const [adminPass, setAdminPass] = useState('')

  const handleCustomerSubmit = () => {
  if (tableNumber && customerName) {
    const query = new URLSearchParams({
      name: customerName,
      table: tableNumber,
    }).toString()
    router.push(`/menu?${query}`)
  }
}

  const handleAdminLogin = async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: adminUser, password: adminPass }),
    })

    if (!res.ok) {
      // พยายามอ่าน JSON เพื่อเอาข้อความ error
      let errorMsg = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      try {
        const errorData = await res.json()
        errorMsg = errorData.message || errorMsg
      } catch {
        // ถ้าไม่มี JSON หรืออ่านไม่ออกก็ไม่เป็นไร
      }
      alert(errorMsg)
      return
    }

    const data = await res.json()

    if (data.role === 'ADMIN') {
      router.push('/admin')
    } else if (data.role === 'STAFF') {
      router.push('/WaitStaff')
    } else {
      alert('ไม่พบสิทธิ์การเข้าใช้งาน')
    }
  } catch (error) {
    alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    console.error(error)
  }
}


  return (
    <main className="min-h-screen flex">
      {/* Left: Background Image */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://source.unsplash.com/800x600/?restaurant,food)' }}>
        {/* แนะนำให้เปลี่ยน URL นี้เป็นรูปของคุณเองในภายหลัง */}
      </div>

      {/* Right: Content Area */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#f5f5f5] p-10">
        <h1 className="text-4xl font-bold text-[#7e57c2] mb-8">ยินดีต้อนรับสู่ OrderSync</h1>

        {/* No role selected */}
        {!role && (
          <div className="flex gap-6">
            <button
              onClick={() => setRole('customer')}
              className="px-6 py-3 bg-[#7e57c2] text-white rounded-lg hover:bg-purple-700 transition"
            >
              ลูกค้า
            </button>

            <button
              onClick={() => setRole('admin')}
              className="px-6 py-3 bg-[#7e57c2] text-white rounded-lg hover:bg-purple-700 transition"
            >
              พนักงานร้าน
            </button>
          </div>
        )}

        {/* Customer form */}
        {role === 'customer' && (
          <div className="w-full max-w-sm space-y-4">
            <label className="block">
              <span className="text-gray-700">ชื่อลูกค้า</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="ชื่อลูกค้า"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">เลขโต๊ะ</span>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="เช่น 5"
              />
            </label>

            <button
              onClick={handleCustomerSubmit}
              className="w-full bg-[#7e57c2] text-white py-2 rounded-md hover:bg-purple-700"
            >
              ต่อไป
            </button>

            <button
              onClick={() => setRole(null)}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              กลับ
            </button>
          </div>
        )}

        {/* Admin login form */}
        {role === 'admin' && (
          <div className="w-full max-w-sm space-y-4">
            <label className="block">
              <span className="text-gray-700">ชื่อผู้ใช้</span>
              <input
                type="text"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="admin"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">รหัสผ่าน</span>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm p-2"
                placeholder="รหัสผ่าน"
              />
            </label>

            <button
              onClick={handleAdminLogin}
              className="w-full bg-[#7e57c2] text-white py-2 rounded-md hover:bg-purple-700"
            >
              ล็อกอิน
            </button>

            <button
              onClick={() => setRole(null)}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              กลับ
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
