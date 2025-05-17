'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [role, setRole] = useState<'customer' | 'admin' | null>(null)
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [adminUser, setAdminUser] = useState('')
  const [adminPass, setAdminPass] = useState('')

  useEffect(() => {
    // ล้างค่าเมื่อเข้า /
    localStorage.removeItem('customerName')
    localStorage.removeItem('tableNumber')
  }, [])

  const handleCustomerSubmit = () => {
    if (tableNumber && customerName) {
      // เซ็ตค่าใหม่ใน localStorage
      localStorage.setItem('customerName', customerName);
      localStorage.setItem('tableNumber', tableNumber);

      const query = new URLSearchParams({
        name: customerName,
        table: tableNumber,
      }).toString();
      router.push(`/menu?${query}`);
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
        let errorMsg = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        try {
          const errorData = await res.json()
          errorMsg = errorData.message || errorMsg
        } catch {}
        alert(errorMsg)
        return
      }

      const data = await res.json()

      if (data.user.role === 'ADMIN') {
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
    <main className="min-h-screen flex font-sans text-base md:text-lg">
      {/* Left Section */}
      <div className="w-1/2 relative">
        <Image
          src="/bgfirst.jpg"
          alt="Restaurant Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0  flex flex-col justify-center items-center text-white p-10">
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-14 relative">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#7e57c2] mb-2">Hello</h2>
          <p className="mb-8 text-gray-600 text-lg">Welcome to <span className="font-bold text-[#7e57c2]">OrderSync</span></p>

          {!role && (
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => setRole('customer')}
                className="flex-1 py-3 bg-[#7e57c2] text-white rounded-full hover:bg-purple-700 text-lg"
              >
                Customer
              </button>
              <button
                onClick={() => setRole('admin')}
                className="flex-1 py-3 bg-[#7e57c2] text-white rounded-full hover:bg-purple-700 text-lg"
              >
                Staff
              </button>
            </div>
          )}

          {role === 'customer' && (
            <div className="space-y-5">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#7e57c2] text-lg"
                placeholder="Customer Name"
              />
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#7e57c2] text-lg"
                placeholder="Table Number"
              />
              <button
                onClick={handleCustomerSubmit}
                className="w-full py-3 bg-[#7e57c2] text-white rounded-full hover:bg-purple-700 text-lg"
              >
                Next
              </button>
              <button onClick={() => setRole(null)} className="w-full text-sm text-center text-gray-500 hover:underline">
                go back
              </button>
            </div>
          )}

          {role === 'admin' && (
            <div className="space-y-5">
              <input
                type="text"
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#7e57c2] text-lg"
                placeholder="username"
              />
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#7e57c2] text-lg"
                placeholder="password"
              />
              <button
                onClick={handleAdminLogin}
                className="w-full py-3 bg-[#7e57c2] text-white rounded-full hover:bg-purple-700 text-lg"
              >
                Login
              </button>
              <button onClick={() => setRole(null)} className="w-full text-sm text-center text-gray-500 hover:underline">
                go back
              </button>
            </div>
          )}

          <div className="absolute bottom-6 right-6 text-right text-sm text-[#7e57c2]">
            <div className="font-bold text-base">Name Restaurant</div>
            <div className="flex items-center gap-1">
              <span className="text-sm">📍</span> Your restaurant address
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}