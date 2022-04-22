import React from 'react'
import Button from '../components/Button/btn' 
import { useDocumentTitle } from '../lib/Hooks' 

export default function NotFound() {
  useDocumentTitle('Not Found')
  return (
    <main className="center">
      Not Found
      <p></p>
      <Button href="/create-playlist">Back to login</Button>
    </main>
  )
}
