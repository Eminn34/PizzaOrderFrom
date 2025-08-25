import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()
	return (
		<>
			<header className="main-header">
				<div className="teknolojik-yemekler">
					<p>Teknolojik Yemekler</p>
				</div>
				<div className="hero-section">
					<img src="/assets/iteration-1/home-banner.png" alt="Pizza Banner" className="hero-banner" />
					<div className="hero-content">
						<h1>
							<span className="satisfy-text">fırsatı kaçırma</span><br />
							<span className="roboto-text">KOD AÇIKTIRIR<br />PİZZA, DOYURUR</span>
						</h1>
						<button className="btn" onClick={() => navigate('/order')}>ACIKTIM</button>
					</div>
				</div>
				<nav className="main-nav">
					<ul>
						<li><img src="/assets/iteration-2/icons/1.svg" alt="Kore" /><span>YENİ! Kore</span></li>
						<li><img src="/assets/iteration-2/icons/2.svg" alt="Pizza" /><span>Pizza</span></li>
						<li><img src="/assets/iteration-2/icons/3.svg" alt="Burger" /><span>Burger</span></li>
						<li><img src="/assets/iteration-2/icons/4.svg" alt="Kızartmalar" /><span>Kızartmalar</span></li>
						<li><img src="/assets/iteration-2/icons/5.svg" alt="Fast Food" /><span>Fast Food</span></li>
						<li><img src="/assets/iteration-2/icons/6.svg" alt="Gazlı İçecekler" /><span>Gazlı İçecekler</span></li>
					</ul>
				</nav>
			</header>
			<main>
				<section className="popular-products">
					<span className="popular-text">en çok paketlenen menüler</span><br />
					<span className="popular-text2">Acıktıran Kodlara Doyuran Lezzetler</span>
					<div className="product-icons">
						<button className="icon-button" data-type="Ramen">
							<img src="/assets/iteration-2/icons/1.svg" alt="Ramen" /><span>Ramen</span>
						</button>
						<button className="icon-button" data-type="Pizza">
							<img src="/assets/iteration-2/icons/2.svg" alt="Pizza" /><span>Pizza</span>
						</button>
						<button className="icon-button" data-type="Burger">
							<img src="/assets/iteration-2/icons/3.svg" alt="Burger" /><span>Burger</span>
						</button>
						<button className="icon-button" data-type="French fries">
							<img src="/assets/iteration-2/icons/4.svg" alt="French fries" /><span>French fries</span>
						</button>
						<button className="icon-button" data-type="Fast Food">
							<img src="/assets/iteration-2/icons/5.svg" alt="Fast Food" /><span>Fast Food</span>
						</button>
						<button className="icon-button" data-type="Soft Drinks">
							<img src="/assets/iteration-2/icons/6.svg" alt="Soft Drinks" /><span>Soft Drinks</span>
						</button>
					</div>
					<div className="product-grid">
						<div className="product-card">
							<img src="/assets/iteration-2/pictures/food-1.png" alt="Special Pizza" />
							<h3>Terminal Pizza</h3>
							<div className="rating"><span>4.9</span></div>
							<div className="price"><span>89.90 ₺</span><button className="add-to-cart">+</button></div>
						</div>
						<div className="product-card">
							<img src="/assets/iteration-2/pictures/food-2.png" alt="Margherita Pizza" />
							<h3>Position Absolute Acı Pizza</h3>
							<div className="rating"><span>4.7</span></div>
							<div className="price"><span>79.90 ₺</span><button className="add-to-cart">+</button></div>
						</div>
						<div className="product-card">
							<img src="/assets/iteration-2/pictures/food-3.png" alt="Beef Burger" />
							<h3>Beef Pizza Double Burger</h3>
							<div className="rating"><span>4.8</span></div>
							<div className="price"><span>69.90 ₺</span><button className="add-to-cart">+</button></div>
						</div>
					</div>
				</section>
				<div className="promo-container">
					<div className="promo-panel pizza-panel left-panel">
						<div className="panel-content pizza-text">
							<h2>Özel<br />Lezzetus</h2>
							<p className="subtitle">Position:Absolute Acı Burger</p>
							<a href="#" className="order-btn" onClick={(e) => { e.preventDefault(); navigate('/order') }}>SİPARİŞ VER</a>
						</div>
					</div>
					<div className="right-container">
						<div className="promo-panel burger-panel right-panel">
							<div className="panel-content burger-text">
								<h2>Hackathlon</h2>
								<p className="subtitle">Burger Menü</p>
								<a href="#" className="order-btn" onClick={(e) => { e.preventDefault(); navigate('/order') }}>SİPARİŞ VER</a>
							</div>
						</div>
						<div className="promo-panel delivery-panel right-panel">
							<div className="panel-content delivery-text">
								<h2><span style={{ color: '#e53e3e' }}>Çoooook</span> <span style={{ color: '#292929' }}>hızlı</span></h2>
								<p className="subtitle">npm gibi kurye</p>
								<a href="#" className="order-btn" onClick={(e) => { e.preventDefault(); navigate('/order') }}>SİPARİŞ VER</a>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer>
				<div className="footer-content">
					<div className="footer-section">
						<h3><img src="/assets/iteration-2/footer/logo-footer.svg" alt="logo" /></h3>
						<ul>
							<li><img src="/assets/iteration-2/footer/icons/icon-1.png" alt="" /><span>341 Londonderry Road, Istanbul Türkiye</span></li>
							<li><img src="/assets/iteration-2/footer/icons/icon-2.png" alt="" /><span>  aciktim@teknolojikyemekler.com</span></li>
							<li><img src="/assets/iteration-2/footer/icons/icon-3.png" alt="" /><span> +90 216 123 45 67</span></li>
						</ul>
					</div>
					<div className="footer-section">
						<h3>Hot Menu</h3>
						<ul>
							<li>Terminal Pizza</li>
							<li>5 Kişilik Hackathlon Pizza</li>
							<li>Tavuklu Pizza</li>
							<li>Beyaz Console Frosty</li>
							<li>Testler Geçti Mutlu Burger</li>
							<li>Position Absolute Acı Burger</li>
						</ul>
					</div>
					<div className="footer-section">
						<h3>Instagram</h3>
						<div className="instagram-grid">
							<img src="/assets/iteration-2/footer/insta/li-0.png" alt="" />
							<img src="/assets/iteration-2/footer/insta/li-1.png" alt="" />
							<img src="/assets/iteration-2/footer/insta/li-2.png" alt="" />
							<img src="/assets/iteration-2/footer/insta/li-3.png" alt="" />
							<img src="/assets/iteration-2/footer/insta/li-4.png" alt="" />
							<img src="/assets/iteration-2/footer/insta/li-5.png" alt="" />
						</div>
					</div>
				</div>
			</footer>
		</>
	)
} 