import React, { useState, useEffect } from 'react';
import classes from './Opportunities.module.css';
import { Button, Card, Loader } from '../common';
import http from '../../api';
import Swal from 'sweetalert2';

import ReactGA from 'react-ga4';
import ThemeButton from '../common/ThemeButton/ThemeButton';
import debounce from '../../helper/debounce';

const Opportunities = () => {
	const [pageNumber, setPageNumber] = useState(0);
	const [jobData, setJobData] = useState(null);
	const [test, setTest] = useState(null);
	const [loading, setLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState(5);
	useEffect(() => {
		ReactGA.send('pageview');
		getData();
	}, [pageNumber, limit]);
	useEffect(() => {
		const pageButtons = new Array(numberOfPages).fill(null).map((_, i) => i);
		setPages(pageButtons);
	  }, [numberOfPages]);	
	const getData = async () => {
		try {
			http.get(`/job/getJobs?page=${pageNumber}&limit=${limit}`).then((response) => {
				const data = response.data.jobs;
				const totalPages=response.data.totalPages;
				setLoading(false);
				setJobData(data);
				setNumberOfPages(totalPages);
				setTest(data);
			});
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Unable to fetch the jobs',
				text: error,
			});
		}
	};
    
	const handlePageChange = (event) => {
		setPageNumber(parseInt(event.target.value));
	  };
	
	  const LimitPageChange = (event) => {
		setLimit(parseInt(event.target.value));
		setPageNumber(0); // Reset page number when limit changes
	  };
	
	  const gotoPrevious = () => {
		setPageNumber((prevPageNumber) => Math.max(0, prevPageNumber - 1));
	  };
	
	  const gotoNext = () => {
		setPageNumber((prevPageNumber) => Math.min(numberOfPages - 1, prevPageNumber + 1));
	  };	

	const debouncedSearch = debounce(async (key) => {
			try {
				if (key) {
					let result = await http.get(`job/getJobs/${key}`);
					if (result) {
						setJobData(result.data.job);
					}
				} else {
					getData();
				}
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Unable to search the jobs',
					text: error,
				});
			}
		}, 2500);

	const search = async (e) => {
		const key = e.target.value;
		debouncedSearch(key);
	};
	const filterData = async (filterBy) => {
		setJobData(test);
		const filteredData = test.filter((job) => {
			return job.category === filterBy;
		});
		setJobData(() => filteredData);
		console.log(filterBy, filteredData, jobData);
	};

	return (
		<>
			<div className={classes.wrapper}>
				<div className={classes.search_filter}>
					<div>
						<ThemeButton onClick={() => filterData('jobs')} label="Jobs" />
						<ThemeButton
							onClick={() => filterData('hackathons')}
							label="Hackathons"
						/>
						<ThemeButton
							onClick={() => filterData('interns')}
							label="Interns"
						/>
						{/* <ThemeButton onClick={()=>filterData('Others')} label="Others" /> */}
					</div>
                    <div className={classes.base}>
					<div className={classes.searchbar_bg}>
						<input
							type="search"
							placeholder="Search here....."
							className={classes.search_bar}
							onChange={search}
						/>
						<i className="fa fa-search"></i>
					</div>
                  </div>
				</div>
				<h1 className={classes.text}>Opportunities</h1>
				{loading && (
					<div className={classes.loader}>
						<Loader />
					</div>
				)}
				{!loading && jobData.length ? (
					<div className={classes.cards}>
						{jobData.map((opp, i) => {
							return <Card data={opp} key={i} />;
						})}
					</div>
				) : (
					<></>
				)}
				{!loading && !jobData.length && (
					<div className={classes.cards}>
						<p className={classes.no_job}>Currently no opportunities found!</p>
					</div>
				)}
				{/* {jobData.length === 0 ? (
					<div className={classes.loader}>
						<Loader />
					</div>
				) : (
					<>
						<div className={classes.cards}>
							{jobData.length > 0 ? (
								jobData.map((opp, i) => {
									return <Card data={opp} key={i} />;
								})
							) : (
								<p className={classes.no_job}>Currently no jobs found!</p>
							)}
						</div>
					</>
				)} */}
			</div>

					<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: '20px',
			marginBottom: '20px',
		}}
		>
		<button
			onClick={gotoPrevious}
			disabled={pageNumber === 0}
			style={{
			color: '#ECF0F1',
			padding: '10px 20px',
			fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: '#7F00FF',
			border: '2px solid black',
			borderRadius: '5px',
			marginRight: '10px',
			}}
		>
			Prev
		</button>

		<select
			value={pageNumber}
			onChange={handlePageChange}
			style={{
			padding: '10px 20px',
			fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: '#f0f0f0',
			border: '2px solid black',
			borderRadius: '5px',
			marginRight: '10px',
			}}
		>
			{pages.map((pageIndex) => (
			<option key={pageIndex} value={pageIndex}>
				{pageIndex + 1}
			</option>
			))}
		</select>
		<h2 style={{ marginTop: '4px', marginRight: '12px' }}>of {numberOfPages}</h2>
		<button
			onClick={gotoNext}
			disabled={pageNumber === numberOfPages - 1}
			style={{
			color: '#ECF0F1',
			padding: '10px 20px',
			fontSize: '16px',
			fontWeight: 'bold',
			backgroundColor: '#7F00FF',
			border: '2px solid black',
			borderRadius: '5px',
			marginLeft: '10px',
			}}
		>
			Next
		</button>

		<div style={{ marginLeft: '50px', display: 'flex', alignItems: 'center' }}>
			<h2 style={{ marginTop: '4px', marginRight: '12px' }}>Items per page</h2>
			<select
			value={limit}
			onChange={LimitPageChange}
			style={{
				padding: '10px 20px',
				fontSize: '16px',
				fontWeight: 'bold',
				backgroundColor: '#f0f0f0',
				border: '2px solid black',
				borderRadius: '5px',
			}}
			>
			<option>5</option>
			<option>10</option>
			<option>20</option>
			<option>50</option>
			</select>
		</div>
		</div>

		</>
	);
};

export default Opportunities;
