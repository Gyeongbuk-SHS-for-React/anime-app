import React, { useEffect, useState } from 'react'

export default function Detail(props) {
  const { id, children } = props

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setLoading(true)
    const api = await fetch(`https://ghibliapi.herokuapp.com/films/${id}`)
    const json = await api.json()
    console.log('json', json)
    setData(json)
    setLoading(false)
  }, [id])

  const { title, description, image, director, producer, release_date, running_time, rt_score } = data

  return (
		<div style={{ height: "100%" }}>
			{loading ? (
				<div
					style={{ width: "100%", height: '100%', display: "flex", justifyContent: "center", alignItems: 'center' }}
				>
					<div className="loader" />
				</div>
			) : (
				<>
					<div style={{ display: "flex" }}>
						<span style={{ fontWeight: "bold" }}>{title}</span>
						{children}
					</div>
					<div>
						<img src={image} width={150} />
					</div>
					<div style={{ position: "relative", marginLeft: 10 }}>
						<h3 style={{ padding: "5px 0px" }}>제목: {title}</h3>
						<div>감독: {director}</div>
						<div>연출: {producer}</div>
						<div>출시년도: {release_date}</div>
						<div>플레이타임: {running_time}</div>
						<div>평점: {rt_score} / 100</div>
					</div>
					<div style={{ marginTop: 10 }}>
						<b>설명</b>
						<div>{description}</div>
					</div>
				</>
			)}
		</div>
	);
}
