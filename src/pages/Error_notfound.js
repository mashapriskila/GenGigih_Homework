import React from 'react'
import Btn from '../components/Button/btn' 
import { useDocumentTitle } from '../data/Hooks' 

export default function NotFound() {
  useDocumentTitle('Not Found - Spotify')
  return (
    <main className="center">
      Not Found
      <p></p>
      <Btn href="/create-playlist">Back to login</Btn>
    </main>
  )
}
