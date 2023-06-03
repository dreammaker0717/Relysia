import { makeStyles, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
	zapsContainer: {
		paddingInline: 25,
		zIndex: '250',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 128,
		width: '70vw',
		borderRadius: '32px',
		boxShadow: '0px 12px 40px rgba(40, 37, 84, 0.15)',
		transition: 'all .20s linear',
		'&:hover': {
			// filter:'brightness(.9) saturate(.7)',
			boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.15)',
			transform: 'translateY(-7px) scale(1.01)'
		}
	},
	abutton: {
		color: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingInline: 5,
		height: '50px',
		aspectRatio: '2.825',
		borderRadius: 12,
		boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.15)',
		transition: 'all .20s linear',
		'&:hover': {
			filter: 'brightness(.9) saturate(.7)',
			boxShadow: '0px 20px 40px rgba(65, 124, 241, 0.25)',
			transform: 'translateY(-7px)'
		}
	}
}));
function ZapsPage(props) {
	const matchdesktop = useMediaQuery('(min-width:750px)');
	const classes = useStyles();
	const [ checked, setchecked ] = React.useState(false);
	const [ hrefData, sethrefData ] = React.useState(null);
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://zapier.com/apps/embed/widget.js?services=relysia&html_id=foo';
		script.async = true;
		document.body.appendChild(script);
		setTimeout(() => {
			setchecked(true);
		}, 1500);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	var elements = document.getElementsByClassName('zap-cta');
	// console.log(elements)
	useEffect(
		() => {
			if (checked && !hrefData && elements && elements[0] && elements[1]) {
				// console.log(elements[0].children[0].dataset.popupHref)
				// // 'lected_apis=Twitter'
				// console.log(elements[1].children[0].dataset.popupHref)
				// node.append(elements[0]);
				console.log('starting getting href'); // Append the text to <li>
				if (
					elements[0] &&
					elements[1] &&
					elements[0].children[0].dataset.popupHref &&
					elements[1].children[0].dataset.popupHref
				) {
					let data = [ elements[0].children[0].dataset.popupHref, elements[1].children[0].dataset.popupHref ];

					sethrefData({
						twitter: data.find((a) => a.includes('lected_apis=Twitter')),
						gsheet: data.find((a) => a.includes('ed_apis=GoogleSheets'))
					});
					console.log('done');
				}
				// document.getElementById("tester").append(elements[0]);
			}
		},
		[ checked ]
	);
	return (
		<section className="domain-search-area ptb-70" style={{ minHeight: '120vh' }}>
			<div className="container">
				<div className="wallet-head22">
					<h1 style={{ textAlign: 'start' }}>Do more with Relysia</h1>
					<h4
						className="w-3/5 lg:w-4/5 md:w-full font-normal"
						style={{ marginBottom: 40, textAlign: 'start', fontSize: 16 }}
					>
						Zapier lets you connect Relysia with thousands of the most popular apps, so you can automate
						your work and have more time for what matters most—no code required.
					</h4>
				</div>
				<div id="foo" />
				<div id="tester ">
					{hrefData && (
						<div>
							<div className={classes.zapsContainer} style={{ minWidth: !matchdesktop ? '100%' : '' }}>
								<img
									style={{ height: '50%' }}
									src="https://i.ibb.co/fC8PMdK/On-Paste-20210914-154821.png"
									alt="On-Paste-20210914-154821"
									border="0"
								/>
								{matchdesktop && (
									<h4
										className="w-3/5 lg:w-4/5 md:w-full font-normal "
										style={{ textAlign: 'center', fontSize: 16 }}
									>
										Transfer BSVs in Reylsia with new Google Sheets rows
									</h4>
								)}
								<button
									onClick={(e) => {
										const { innerWidth: width, innerHeight: height } = window;
										window.open(
											hrefData.gsheet,
											'_blank',
											`location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
										);
									}}
									className={classes.abutton}
									style={{
										backgroundImage: ' linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)'
									}}
								>
									Use {matchdesktop ? 'this' : 'Sheets'} Zap
								</button>
							</div>
							<div
								className={classes.zapsContainer}
								style={{ marginTop: 45, minWidth: !matchdesktop ? '100%' : '' }}
							>
								<img
									style={{ height: '50%' }}
									src="https://i.ibb.co/gMvH2jY/On-Paste-20210914-154914.png"
									alt="On-Paste-20210914-154914"
									border="0"
								/>
								{matchdesktop && (
									<h4
										className="w-3/5 lg:w-4/5 md:w-full font-normal "
										style={{ textAlign: 'center', fontSize: 16 }}
									>
										Transfer BSVs in Relysia for new Twitter followers
									</h4>
								)}

								<button
									onClick={(e) => {
										const { innerWidth: width, innerHeight: height } = window;
										window.open(
											hrefData.twitter,
											'_blank',
											`location=yes,height=${height},width=${width},scrollbars=yes,status=yes`
										);
									}}
									className={classes.abutton}
									style={{
										backgroundImage: ' linear-gradient(111.07deg, #E70060 10.57%, #FC8F0C 105.27%)'
									}}
								>
									Use {matchdesktop ? 'this' : 'Twitter'} Zap
								</button>
							</div>
						</div>
					)}{' '}
				</div>
				<h4 className="w-full font-normal px-5 py-10" style={{ textAlign: 'end', fontSize: 16 }}>
					See more Relysia integrations powered by{' '}
					<a href="#" style={{ fontWeight: 'bold' }}>
						Zapier
					</a>
				</h4>
			</div>
		</section>
	);
}

export default ZapsPage;
