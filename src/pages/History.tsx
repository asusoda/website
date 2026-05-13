import { Helmet } from "react-helmet-async";
import HistoryTimeline from "../components/HistoryTimeline";

function History() {
  return (
    <>
      <Helmet>
        <title>SoDA - History</title>
        <meta
          name="description"
          content="A timeline of the Software Developers Association at ASU, from its earliest known activity to today."
        />
      </Helmet>
      <section className="section pt-12">
        <HistoryTimeline />
      </section>
    </>
  );
}

export default History;
