import {
	FARRAGUT_MEDICAL,
	FAST_TRACK_URGENT_CARE,
	GRUBB_PHARMACY,
	SHADY_GROVE,
	ALPHA_PEOPLES_DRUGS,
	PASSPORT_HEALTH_ALEXANDRIA,
	PASSPORT_HEALTH_BETHESDA,
	PASSPORT_HEALTH_DC,
	PASSPORT_HEALTH_RESTON,
	PASSPORT_HEALTH_SILVER_SPRING,
	PILL_PLUS,
} from "./img";

export const locations = [
	{
		id: 1,
		name: "Shady Grove Medical",
		address: "15005 Shady Grove Rd #240, Rockville, MD 20850",
		lat: 39.102698,
		lng: -77.190221,
		bookingLink: "https://shadygrovemedicine.com/covid-19-testing-facility/",
		image: SHADY_GROVE,
		timings1: "Mon to Fri: 9am - 5pm",
		timings2: "Sat: 9am - 12pm",
		contactNumber: "301-217-0979",
	},
	{
		id: 2,
		name: "Farragut Medical and Travel Care",
		address: "815 Connecticut Ave NW, Washington, DC 20006",
		lat: 38.901257,
		lng: -77.037917,
		bookingLink: "https://www.farragutmedical.com/",
		image: FARRAGUT_MEDICAL,
		timings1: "Mon to Fri: 10Am - 5pm",
		contactNumber: "202-775-8500",
	},
	{
		id: 3,
		name: "Fast Track Urgent Care - Kensington",
		address: "10540 Connecticut Ave, Kensington, MD 20895",
		lat: 39.02830783589008,
		lng: -77.07682728924972,
		bookingLink: " https://fastrackmd.com/covid-19-response/",
		image: FAST_TRACK_URGENT_CARE,
		timings1: "Mon to Fri: 9am - 8:30pm",
		timings2: "Sat: 10:30am - 5pm",
		contactNumber: "844-202-1532",
	},
	{
		id: 4,
		name: "Fast Track Urgent Care - Silver Spring",
		address: "13428 New Hampshire Ave, Colesville, MD 20904",
		lat: 39.076977557310016,
		lng: -77.00246890274003,
		bookingLink: "https://fastrackmd.com/covid-19-response/",
		image: FAST_TRACK_URGENT_CARE,
		timings1: "Mon to Fri: 9am - 9pm",
		timings2: "Sat: 9:30pm - 5:30pm",
		contactNumber: "844-202-1532",
	},
	{
		id: 5,
		name: "Grubbs Pharmacy",
		address: "326 E Capitol St NE, Washington, DC 20003-3809",
		lat: 38.89024144964276,
		lng: -77.00078413158236,
		bookingLink: " http://www.grubbspharmacy.com/",
		image: GRUBB_PHARMACY,
		timings1: "Mon to Fri: 8:30am - 6pm",
		timings2: "Sat: 9am - 3pm",
		contactNumber: "202-543-4400",
	},
	{
		id: 6,
		name: "Passport Health Alexandria",
		address: "3307 Duke St, Alexandria, VA 22314",
		lat: 38.80874,
		lng: -77.08773,
		bookingLink:
			"https://www.passporthealthusa.com/locations/va/alexandria/416/",
		image: PASSPORT_HEALTH_ALEXANDRIA,
		timings1: "Mon to Wed: 8:30am - 7pm",
		timings2: "Thu to Fri: 8:30am - 5pm",
		contactNumber: "703-671-3600",
	},
	{
		id: 7,
		name: "Passport Health Bethesda",
		address: "10401 Old Georgetown Rd#202, Bethesda, MD 20814",
		lat: 38.80874,
		lng: -77.12571,
		bookingLink: "https://www.passporthealthusa.com/locations/md/bethesda/42/",
		image: PASSPORT_HEALTH_BETHESDA,
		timings1: "Mon to Thu: 8:30am - 7pm",
		timings2: "Fri: 8:30am - 5pm",
		contactNumber: "301-408-4544",
	},
	{
		id: 8,
		name: "Passport Health DC",
		address: "1145 19th St NW #702, Washington, DC 20036",
		lat: 39.0262,
		lng: -77.04291,
		bookingLink: "https://www.passporthealthusa.com/dc-metro/",
		image: PASSPORT_HEALTH_DC,
		timings1: "Mon to Wed: 8:30am - 7pm",
		timings2: "Thu to Fri: 8:30am - 5pm",
		contactNumber: "202-561-3600",
	},
	{
		id: 9,
		name: "Pill Plus Pharmacy",
		address: "4215 Connecticut Ave St #1 NW, Washington, DC 20008",
		lat: 38.90931,
		lng: -77.04276,
		bookingLink: "",
		image: PILL_PLUS,
		timings1: "",
		timings2: "",
		contactNumber: "703-786-8402",
	},
	{
		id: 10,
		name: "Passport Health Sliver Spring",
		address: "1734 Elton Rd #205, Sliver Spring, MD 20903",
		lat: 39.122902010259814,
		lng: -76.87578021142694,
		bookingLink:
			"https://www.passporthealthusa.com/locations/md/silver-spring/44/",
		image: PASSPORT_HEALTH_SILVER_SPRING,
		timings1: "Mon to Wed: 8:30am - 7pm",
		timings2: "Thu to Fri: 8:30am - 5pm",
		contactNumber: "301-408-4544",
	},
	{
		id: 11,
		name: "Passport Health Reston",
		address: "11862 Sunrise Valley Dr, Reston, VA 20191",
		lat: 38.94690960639243,
		lng: -77.35747357576045,
		bookingLink: "https://www.passporthealthusa.com/locations/va/reston/724/",
		image: PASSPORT_HEALTH_RESTON,
		timings1: "Mon to Wed: 8:30am - 7pm",
		timings2: "Thu to Fri: 8:30am - 5pm",
		contactNumber: "703-671-3600",
	},
	{
		id: 12,
		name: "Alpha People's Drugs",
		address: "1638 R St NW STE 100, Washington, DC 20009",
		lat: 38.91266781734994,
		lng: -77.0380624604176,
		bookingLink: "https://www.alphapeoplesdrugs.com/",
		image: ALPHA_PEOPLES_DRUGS,
		timings1: "Mon to Fri: 9am - 6pm",
		timings2: "Sat: 9am - 2pm",
		contactNumber: "202-265-7979",
	},
];
