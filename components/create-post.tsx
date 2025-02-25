"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Wand2 } from "lucide-react"
import { newPost } from "@/app/_actions/new-post"
import { signIn, useSession } from "next-auth/react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"


interface CreatePostProps {
  totalPosts: number;
  onCreate: () => void;
}

export default function CreatePost({ totalPosts, onCreate }: CreatePostProps) {
  const [content, setContent] = useState<string>("")
  const [contentAI, setContentAI] = useState<string>("")
  const [isDialogOpen, setDialogIsOpen] = useState<boolean>(false)
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false)

  const { data } =  useSession()

  const enhancePost = async () => {
    setIsEnhancing(true)
    setDialogIsOpen(true)
    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      
      const data = await response.json()

      setContentAI(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!data?.user || totalPosts === 3) return

   await newPost({
      content: content,
      authorId: (data.user as any).id
    })

    setContent("")
    setContentAI("")
    onCreate()
  }

  const handleOnConfirm = () => {
    setContent(contentAI)
  }

  
  const handleGoogleSignIn = async () => {
    return signIn('google')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">

          {!data?.user ? (
            <div className="flex flex-col items-center gap-4 p-5">
              <p>Você não esta conectado, faça login para criar suas publicações.</p>
               <Button onClick={handleGoogleSignIn}>
                Login
              </Button>
            </div>
          ) : totalPosts < 3 ? (
            <div className="p-4 space-y-4">
              <Textarea
                placeholder="O que deseja publicar?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex flex-col items-center gap-4 p-2 bg-red-400 bg-opacity-25 border border-red-600 rounded-md">
                <p className="text-sm text-red-600">Você pode criar até 3 publicações! </p>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={enhancePost}
                  disabled={!content || isEnhancing}
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  Aprimore com IA
                </Button>
                <Button type="submit" disabled={!content}>
                  Publicar
                </Button>
                
              </div>
            </div>
          ) : <div className="flex flex-col items-center gap-4 p-5">
                <p>Você atingiu o limite de publicações para esta conta.</p>
              </div>
          }
        </div>
      </form>
      <AlertDialog  open={isDialogOpen} onOpenChange={setDialogIsOpen}>

        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Sugestão de publicação</AlertDialogTitle>
            <AlertDialogDescription  className="flex flex-col items-center gap-4 py-4">
            { isEnhancing ? 
                <>
                  <Loader2 className="h-8 w-8 animate-spin" />
                  Aguarde, enquanto a IA aprimora sua publicação!
                </> 
              : contentAI
            }
            </AlertDialogDescription>
            
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3">
            {!isEnhancing && 
              <>
                <AlertDialogCancel className="w-full mt-0">Cancelar</AlertDialogCancel>
                <AlertDialogAction  className="w-full" onClick={handleOnConfirm}>
                  Utilizar
                </AlertDialogAction>
              </>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}