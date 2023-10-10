import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from "./Prayer";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";

moment.locale('ar');



export default function MainContent() {

    const [nextPrayerIndex, setnextPrayerIndex] = useState(0)

    const [timings, settimings] = useState({
        Fajr: "04:25",
        Dhuhr: "11:41",
        Asr: "15:04",
        Maghrib: "17:34",
        Isha: "19:04",
    })

    const [remainingTime, setremainingTime] = useState("")

    const [selectedCity, setselectedCity] = useState({
        displayName: "مكة المكرمة",
        apiName: "Makkah al Mukarramah",
        country: 'SA',
    })

    const [today, setToday] = useState()


    const availableCity = [
        {
            displayName: "مكة المكرمة",
            key: "Makkah al Mukarramah",
        }, {
            displayName: "الرياض",
            apiName: "Riyadh",
            country: 'SA',
        },
        {
            displayName: "القاهره",
            apiName: "Cairo",
            country: 'EG',
        },
    ]

    const prayersArray = [
        {
            displayName: "الفجر",
            key: "Fajr",
        }, {
            displayName: "الظهر",
            apiName: "Dhuhr",
        },
        {
            displayName: "العصر",
            apiName: "Asr",
        },
        {
            displayName: "المغرب",
            apiName: "Maghrib",
        },
        {
            displayName: "العشاء",
            apiName: "Isha",
        },
    ]

    const getTimings = async () => {
        const respons = await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=${selectedCity.country}`)
        settimings(respons.data.data.timings)
    }

    useEffect(() => {
        getTimings()

    }, [selectedCity])

    useEffect(() => {
        const t = moment()
        setToday(t.format("MMMM Do YYY | h:mm:ss a"))

        const interval = setInterval(() => {
            setCountdownTimer();
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [timings])



    const setCountdownTimer = () => {
        const momentNow = moment()
        let prayerIndex = 1;

        if (momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))) {
            prayerIndex = 1
        } else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timings["Asr"], "hh:mm"))) {
            prayerIndex = 2
        }
        else if (momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))) {
            prayerIndex = 3
        }
        else if (momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) && momentNow.isBefore(moment(timings["Isha"], "hh:mm"))) {
            prayerIndex = 4
        }
        else {
            prayerIndex = 0

        }

        setnextPrayerIndex(prayerIndex);

        const nextPrayerObject = prayersArray[prayerIndex]
        const nextPrayerTime = timings[nextPrayerObject.apiName]
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm")

        let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow)

        if (remainingTime < 0) {
            const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow)
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))

            const totlaDiffrence = midnightDiff + fajrToMidnightDiff;

            remainingTime = totlaDiffrence
        }

        const durationRemainingTime = moment.duration(remainingTime);
        setremainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)
    };

    const handleChange = (event) => {
        const cityObject = availableCity.find((city) => {
            return city.apiName == event.target.value
        })
        console.log(event.target.value);
        setselectedCity(cityObject)
    };


    return (
        <div id="MainContent">
            {/* TOP ROW */}
            <Grid container>
                <Grid xs={6}>
                    <div>
                        <h2 className=" text-[17px] font-bold text-[#9E9E9E]">{today}</h2>
                        <h1 className="text-[50px]">{selectedCity.displayName}</h1>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div>
                        <h2 className=" text-[17px] font-bold text-[#9E9E9E]">متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
                        <h1 className="text-[50px]">{remainingTime}</h1>
                    </div>
                </Grid>
            </Grid>
            {/*END TOP ROW */}
            <Divider variant="middle" style={{ borderColor: "white", opacity: "0.1" }} />
            {/* Prayers Cards */}
            <Stack direction="row" justifyContent={"space-around"} style={{ marginTop: "50px", flexWrap: 'wrap' }}>
                <Prayer name="الفجر" time={timings.Fajr} image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2" />
                <Prayer name="الظهر" time={timings.Dhuhr} image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921" />
                <Prayer name="العصر" time={timings.Asr} image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf" />
                <Prayer name="المغرب" time={timings.Maghrib} image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5" />
                <Prayer name="العشاء" time={timings.Isha} image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d" />
            </Stack>
            {/*End Prayers Cards */}
            <Stack direction="row" justifyContent={"center"}>
                <FormControl style={{ width: '20%' }}>
                    <InputLabel id="demo-simple-select-label"><span style={{ color: "white" }}>المدينة</span></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        onChange={handleChange}
                        style={{ color: "white" }}
                    >
                        {availableCity.map((el, index) => {
                            return (
                                <MenuItem key={index} value={el.apiName}>{el.displayName}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Stack>
        </div>
    )
}
