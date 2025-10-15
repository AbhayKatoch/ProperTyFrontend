import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import api from "../api/axios"
import axios  from "axios"
import Iridescence from "../components/ui/iridescence"
import Navbar from "../components/Navbar"
export default function Login() {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [forgotMode, setForgotMode] = useState(false);
  const [resetPhone, setResetPhone] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    localStorage.removeItem("token");
    try {
      const res = await api.post("brokers/login/", {phone, password})
      const { token, broker } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("broker_id", broker.id)
      localStorage.setItem("broker_name", broker.name)
      navigate("/dashboard")
    } catch (err) {
      const data = err.response?.data;

      if (data?.needs_setup) {
        alert("Password not set. Please create one first.");
        localStorage.setItem("broker_id", data.broker_id);
        navigate("/register");
        return;
      }

      const msg =
        data?.error || "Invalid phone number or password. Try again.";
      alert(msg);
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
  if (!phone) {
    alert("Please enter your registered phone number first.");
    return;
  }

  try {
    const res = await axios.post("https://key-mate.onrender.com/api/brokers/forgot-password/", {
  phone,
});
    alert("A WhatsApp message has been sent to reset your password.");
  } catch (err) {
    alert(err.response?.data?.error || "Error sending reset request.");
  }
};


  return (
    <div className="h-screen relative flex flex-col w-full">
      {/* <div className="absolute inset-0 -z-10 pointer-events-none">
        <Iridescence
          color={[0.3, 0.6, 0.8]}   // bluish iridescence
          speed={0.8}
          amplitude={0.15}
          mouseReact={true}
        />
      </div> */}
      <Navbar/>
      <main className="flex flex-1 items-center justify-center">


        <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl">Welcome</CardTitle>
          <CardDescription>
            Please login to your broker account.
          </CardDescription>
        </CardHeader>
          <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-sky-600"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 my-4">
          <Button type="submit" disabled={loading} className="w-full bg-sky-600 text-white hover:bg-sky-800">
            {loading ? "Logging in..." : "Login"}
          </Button>
          
        </CardFooter>
        </form>
      </Card>
      </main>
    </div>
  )
}
