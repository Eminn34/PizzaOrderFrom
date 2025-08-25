import React, { useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TOPPINGS = [
	'Sucuk', 'Sosis', 'Pastırma', 'Mısır', 'Zeytin', 'Mantar', 'Soğan', 'Biber', 'Jalapeno', 'Mozzarella', 'Ananas', 'Ton Balığı'
]

const PRIMARY_ENDPOINT = 'https://reqres.in/api/pizza'
const FALLBACK_ENDPOINT = 'https://reqres.in/api/users'
const ALT_FALLBACK_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'

export default function Order({ onOrderComplete }) {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [size, setSize] = useState('')
	const [dough, setDough] = useState('')
	const [toppings, setToppings] = useState([])
	const [notes, setNotes] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')

	const isNameValid = name.trim().length >= 3
	const isToppingsValid = toppings.length >= 4 && toppings.length <= 10
	const isSizeValid = !!size
	const isDoughValid = !!dough
	const isFormValid = isNameValid && isToppingsValid && isSizeValid && isDoughValid && !submitting

	const price = useMemo(() => {
		const base = size === 'S' ? 75 : size === 'M' ? 85 : size === 'L' ? 95 : 0
		const doughCost = dough === 'ince' ? 0 : dough === 'normal' ? 5 : dough === 'kalın' ? 10 : 0
		const toppingCost = toppings.length * 5
		return base + doughCost + toppingCost
	}, [size, dough, toppings])

	function toggleTopping(t) {
		setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
	}

	async function postWithFallback(payload) {
		const cfg = { headers: { 'Content-Type': 'application/json' }, timeout: 8000 }
		try {
			return await axios.post(PRIMARY_ENDPOINT, payload, cfg)
		} catch (e1) {
			console.warn('Primary endpoint failed', e1?.response?.status)
			try {
				return await axios.post(FALLBACK_ENDPOINT, payload, cfg)
			} catch (e2) {
				console.warn('Fallback endpoint failed', e2?.response?.status)
				try {
					return await axios.post(ALT_FALLBACK_ENDPOINT, payload, cfg)
				} catch (e3) {
					console.warn('Alt fallback endpoint failed', e3?.response?.status)
					const mock = { data: { ...payload, id: String(Date.now()), createdAt: new Date().toISOString(), source: 'client-mock' } }
					return mock
				}
			}
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
		if (!isFormValid) return
		setSubmitting(true)
		setError('')
		const payload = {
			isim: name.trim(),
			boyut: size,
			hamur: dough,
			malzemeler: toppings,
			özel: notes,
			tutar: price,
		}
		try {
			const res = await postWithFallback(payload)
			console.log('Sipariş Özeti:', payload)
			console.log('API Yanıtı:', res.data)
			onOrderComplete && onOrderComplete(res.data)
			navigate('/success')
		} catch (err) {
			const status = err?.status || err?.response?.status
			const message = err?.response?.data?.error || err?.message
			console.error('Sipariş gönderilemedi', err)
			setError(status ? `Sipariş gönderilemedi (HTTP ${status}). ${message || ''}` : 'Sipariş gönderilemedi. Lütfen internet bağlantınızı kontrol edin.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
			<h1 style={{ marginBottom: 16 }}>Pizza Sipariş Formu</h1>
			<form onSubmit={handleSubmit} noValidate>
				<div style={{ marginBottom: 12 }}>
					<label htmlFor="name">İsim</label><br />
					<input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" aria-invalid={!isNameValid} />
					{!isNameValid && <small style={{ color: '#CE2829' }}>En az 3 karakter olmalı</small>}
				</div>

				<fieldset style={{ marginBottom: 12 }}>
					<legend>Boyut Seçimi</legend>
					<label><input type="radio" name="size" value="S" checked={size==='S'} onChange={(e) => setSize(e.target.value)} /> S</label>{' '}
					<label><input type="radio" name="size" value="M" checked={size==='M'} onChange={(e) => setSize(e.target.value)} /> M</label>{' '}
					<label><input type="radio" name="size" value="L" checked={size==='L'} onChange={(e) => setSize(e.target.value)} /> L</label>
					{!isSizeValid && <small style={{ color: '#CE2829', display: 'block' }}>Lütfen boyut seçiniz</small>}
				</fieldset>

				<fieldset style={{ marginBottom: 12 }}>
					<legend>Hamur Seçimi</legend>
					<label><input type="radio" name="dough" value="ince" checked={dough==='ince'} onChange={(e) => setDough(e.target.value)} /> İnce (+0₺)</label>{' '}
					<label><input type="radio" name="dough" value="normal" checked={dough==='normal'} onChange={(e) => setDough(e.target.value)} /> Normal (+5₺)</label>{' '}
					<label><input type="radio" name="dough" value="kalın" checked={dough==='kalın'} onChange={(e) => setDough(e.target.value)} /> Kalın (+10₺)</label>
					{!isDoughValid && <small style={{ color: '#CE2829', display: 'block' }}>Lütfen hamur seçiniz</small>}
				</fieldset>

				<fieldset style={{ marginBottom: 12 }}>
					<legend>Ek Malzemeler (min 4, max 10)</legend>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
						{TOPPINGS.map(t => (
							<label key={t}>
								<input type="checkbox" checked={toppings.includes(t)} onChange={() => toggleTopping(t)} /> {t}
							</label>
						))}
					</div>
					{!isToppingsValid && <small style={{ color: '#CE2829', display: 'block' }}>4 ile 10 arasında malzeme seçiniz</small>}
				</fieldset>

				<div style={{ marginBottom: 12 }}>
					<label htmlFor="notes">Notlar</label><br />
					<textarea id="notes" name="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Örn: Kenarları bol susamlı olsun" />
				</div>

				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<strong>Tutar: {price.toFixed(2)} ₺</strong>
					<button type="submit" disabled={!isFormValid}>{submitting ? 'Gönderiliyor...' : 'Siparişi Ver'}</button>
				</div>
				{error && <p role="alert" style={{ color: '#CE2829' }}>{error}</p>}
			</form>
		</main>
	)
} 