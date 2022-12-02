import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { auth } from "../firebase-config";
import useFirebaseUser from "../hooks/useFirebaseUser";
import { Report } from "../models/report";
import { getReport } from "../services/actions-service";
import Tweet from "../components/Tweet";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import * as moment from "moment";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFReport from "../components/PDFReport";
import ReactPDF from '@react-pdf/renderer';

function subtractWeeks(numOfWeeks: number, date = new Date()) {
  date.setDate(date.getDate() - numOfWeeks * 7);

  return date;
}

const getDateRange = (num: number) => {
  const start = subtractWeeks(num + 1);
  const end = subtractWeeks(num);
  return { start, end };
};

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [numW, setNumW] = useState(0);
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | null>(
    null
  );
  const [report, setReport] = useState<Report | null>(null);
  const user = useFirebaseUser();
  console.log(user);

  const fetchReport = async () => {
    if (!dateRange) return;
    console.log(dateRange);
    setLoading(true);
    const report = await getReport(dateRange!.start.getTime());
    setReport(report!);
    setLoading(false);
  };

  const downloadReport = () => {
    ReactPDF.render(<PDFReport report={report} selectedDate={dateRange?.start ?? new Date()}/>, `${__dirname}/example.pdf`);
  }

  useEffect(() => {
    const range = getDateRange(numW);
    setDateRange(range);
    fetchReport();
  }, []);

  useEffect(() => {
    const unsuscribe = auth.onIdTokenChanged((user) => {
      console.log(user);
    });
    return () => {
      unsuscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    fetchReport();
  }, [dateRange]);

  console.log(report);

  return (
    <div>
      <div></div>
      <div>
        {loading || !report ? (
          <Loader />
        ) : (
          <div>
            <MobileDatePicker
              label="Fecha de inicio"
              inputFormat="DD/MM/YYYY"
              value={new Date(dateRange?.start ?? 0)}
              onChange={(e: moment.Moment | null) => {
                if (e) setDateRange({ ...dateRange!, start: e.toDate() });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <h1 style={{ marginBottom: "24px" }}>
              Reporte del {new Date(report.date).toLocaleDateString()}
            </h1>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <h2>Usuario con más eventos</h2>
                <p>{report.userWithMostEvents.email}</p>
                <p>{report.userWithMostEvents.numEvents} eventos</p>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <h2>Tweets creados</h2>
                <p>{report.tweetsCreated} tweets</p>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <h2>Usuarios activos</h2>
                <p>{report.numUsers} usuarios</p>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
              <CardContent>
                <h2>Tweet con más respuestas</h2>
                <Tweet tweet={report.tweetWithMostReplies} />
              </CardContent>
            </Card>
            <PDFDownloadLink document={<PDFReport report={report} selectedDate={dateRange?.start ?? new Date()} />} fileName="TweeterReloadedReport.pdf">
              {({ blob, url, loading, error }) => (loading ? 'Cargando...' : <button type="button" className="btn main ml-auto">
                Descargar reporte
              </button>)}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
