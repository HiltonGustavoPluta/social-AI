"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { MessageSquarePlus, Home, User } from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Image from "next/image"


export default function Navbar() {

  const { data } = useSession()

  const handleGoogleSignIn = async () => {
    return signIn('google')
  }

  const handleLogout = () => {
    return signOut()
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="logo.png" alt="Logo Hilton Gustavo" width={70} height={40} />
          <span className="font-bold text-xl">SocialAI</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          {data?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="">
                    <AvatarImage src={data?.user?.image ?? ""} />
                    <AvatarFallback>{data?.user?.name?.split('')[0]}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={data?.user?.image ?? ""} />
                      <AvatarFallback>{data?.user?.name?.split('')[0]}</AvatarFallback>
                    </Avatar>
                    <p className="font-bold">{data?.user?.name}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Meu perfil</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} role="button">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
    
          ) : (
            <Button onClick={handleGoogleSignIn} className="w-full">
              Login
            </Button>
          )}
          
        </div>
      </div>
    </nav>
  )
}