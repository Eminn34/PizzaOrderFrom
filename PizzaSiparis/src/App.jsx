import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'
import Success from './pages/Success'

export default function App() {
	const [lastOrder, setLastOrder] = useState(null)

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/order" element={<Order onOrderComplete={setLastOrder} />} />
			<Route path="/success" element={<Success order={lastOrder} />} />
		</Routes>
	)
} 