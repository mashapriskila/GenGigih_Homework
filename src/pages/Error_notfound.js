import React from 'react'
import Btn from '../components/Button/btn' 
import { useDocumentTitle } from '../data/Hooks' 

export default function NotFound() {
  useDocumentTitle('Not Found - Spotify')
  return (
    <main className="center">
      No Content Here...
      <Btn href="/create-playlist">Go To Content</Btn>
    </main>
  )
}
