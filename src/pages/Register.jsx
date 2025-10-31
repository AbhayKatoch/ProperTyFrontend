// src/pages/Register.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import api from "../api/axios"
import Iridescence from "../components/ui/iridescence"
import Navbar from "../components/Navbar"

export default function Register() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("brokers/register/", { name, phone, email, password })
      const { token, broker } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("broker_id", broker.id)
      localStorage.setItem("broker_name", broker.name)
      alert("Registration successful!")
      navigate("/dashboard")
    } catch (err) {
      const msg = err.response?.data?.error || "Registration failed. Try again."
      alert(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen relative flex flex-col w-full">
      {/* <div className="absolute inset-0 -z-10 pointer-events-none">
        <Iridescence color={[0.2, 0.6, 0.9]} speed={0.8} amplitude={0.2} mouseReact />
      </div> */}


      <main className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-sm bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="font-bold text-3xl">Create Account</CardTitle>
            <CardDescription>Set up your broker account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 my-4">
              <Button type="submit" disabled={loading} className="w-full bg-sky-600 text-white hover:bg-sky-800">
                {loading ? "Registering..." : "Register"}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
