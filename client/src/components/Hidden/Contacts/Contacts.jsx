import React, { useState, useEffect } from 'react';
import { Button } from '../../common';
import classes from './Contacts.module.css';
import http from '../../../api';

const Contacts = () => {
	const [contactsData, setContactsData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const deleteAllContacts = async () => {
		try {
			await http.delete('/contact/deleteContacts');
		} catch (err) {
			console.log(err);
		}
	};

	const getData = async () => {
		try {
			await http.get('/contact/getContacts').then((response) => {
				const data = response.data.contacts;
				setContactsData(data);
			});
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<h2 className={classes.heading}>Contacts</h2>
			<Button label="Delete All Contacts" onClick={deleteAllContacts} />

			<div className={classes.contacts}>
				{
					// contactsData?.length > 0 ? (
					contactsData?.map((c, i) => {
						return (
							<>
								<div className={classes.contact} key={i}>
									<p>Name:{c.name}</p>
									<p>Email:{c.email}</p>
									<p>Message:{c.message}</p>
									<p>Phone Number:{c.phoneNo}</p>
								</div>
							</>
						);
					})
					// ) : (
					// 	<h1>No Data Found</h1>
					// )
				}
			</div>
		</>
	);
};

export default Contacts;
