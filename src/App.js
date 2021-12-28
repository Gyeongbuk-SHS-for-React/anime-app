import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [visible, setVisible] = useState(undefined)
  const [data, setData] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const api = await fetch('https://ghibliapi.herokuapp.com/films')
    const json = await api.json()
    console.log('json', json)
    setData(json)
  }, [])

  const { title, description } = visible || {}

	return (
		<div>
			{visible && (
				<div
					style={{
						width: "100vw",
						height: "100vh",
						zIndex: 99999,
						top: 0,
						left: 0,
            position: 'fixed',
						backgroundColor: "rgba(0, 0, 0, 0.4)",
					}}
				>
					<div className="modal card">
						<div style={{ display: "flex" }}>
							<span style={{ fontWeight: 'bold' }}>
                {title}
              </span>
							<button
								style={{ marginLeft: "auto" }}
								onClick={() => setVisible(undefined)}
							>
								X
							</button>
						</div>
            <div>
              <div>
                {description}
              </div>
            </div>
					</div>
				</div>
			)}
			{data.map((anime) => {
				const {
					id,
					title,
					image,
					director,
					producer,
					release_date,
					running_time,
					rt_score,
				} = anime;
				return (
					<div className="movie_card card" key={id}>
						<img src={image} width={200} />
						<div style={{ position: "relative" }}>
							<h1 style={{ padding: "5px 0px" }}>제목: {title}</h1>
							<span>감독: {director}</span>
							<span>연출: {producer}</span>
							<span>출시년도: {release_date}</span>
							<span>플레이타임: {running_time}</span>
							<span>평점: {rt_score} / 100</span>
							<div
								className={"btn"}
								onClick={() => setVisible(anime)}
								style={{
									position: "absolute",
									right: "20px",
									bottom: "20px",
								}}
							>
								detail >
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default App;
