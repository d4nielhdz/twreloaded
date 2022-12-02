import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: "1.5cm",
        fontSize: 10,
    },
    section: {
        marginVertical: 8,
        borderTop: "1px solid gray"
    },
    title: {
        fontSize: 22,
        marginTop: 5,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
    },
});

const fecha = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    let dateformatted = dd + '/' + mm + '/' + yyyy;
    return dateformatted;
}



const PDFReport = ({ report, selectedDate }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.title}>Reporte de Tweeter Reloaded</Text>
                    <Text>Fecha: {fecha(selectedDate)}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Usuario con más eventos</Text>
                    <View>
                        <Text>Correo: {report.userWithMostEvents.email}</Text>
                        <Text>Número de eventos: {report.userWithMostEvents.numEvents}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Tweets creados</Text>
                    <View>
                        <Text>Cantidad: {report.tweetsCreated}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Usuarios activos</Text>
                    <View>
                        <Text>Cantidad: {report.numUsers}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Tweet con más respuestas</Text>
                    <View>
                        <View>
                            <Text>Usuario: {report.tweetWithMostReplies.user.username}</Text>
                            <Text>Tweet: {report.tweetWithMostReplies.content}</Text>
                            <Text>Cantidad de respuestas: {report.tweetWithMostReplies.replyCount}</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default PDFReport;