import React from 'react'
import { Link } from 'react-router-dom'

export default function Success() {
	return (
		<div className="success-page">
			<header className="success-header">Teknolojik Yemekler</header>
			<main className="success-content" role="status" aria-live="polite">
				<h1 className="success-title">TEBRİKLER!</h1>
				<h2 className="success-subtitle">SİPARİŞİNİZ ALINDI!</h2>
				<Link to="/" className="success-link" aria-label="Anasayfaya dön">Anasayfaya Dön</Link>
			</main>
		</div>
	)
}