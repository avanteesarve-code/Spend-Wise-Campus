import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "",
  type = "monthly-report",
  data = {},
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName || "there"},</Text>
            <Text style={styles.text}>
              Here’s your financial summary for {data?.month}:
            </Text>

            {/* --- Main Stats --- */}
            <Section style={styles.statsContainer}>
              <Section style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>₹{data?.stats?.totalIncome}</Text>
              </Section>
              <Section style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>₹{data?.stats?.totalExpenses}</Text>
              </Section>
              <Section style={styles.stat}>
                <Text style={styles.text}>Net Savings</Text>
                <Text style={styles.heading}>
                  ₹
                  {data?.stats
                    ? data.stats.totalIncome - data.stats.totalExpenses
                    : 0}
                </Text>
              </Section>
            </Section>

            {/* --- Category Breakdown --- */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>
                  Campus Expenses by Category
                </Heading>
                {Object.entries(data.stats.byCategory).map(
                  ([category, amount]) => (
                    <Section key={category} style={styles.row}>
                      <Text style={styles.text}>
                        {category.replace("-", " ")}
                      </Text>
                      <Text style={styles.text}>₹{amount}</Text>
                    </Section>
                  )
                )}
              </Section>
            )}

            {/* --- AI Insights --- */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Campus Wealth Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using <b>Spend Wise Campus</b> 💜 <br />
              Keep managing your budget for a financially smart student life!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Campus Budget Alert</Heading>
            <Text style={styles.text}>Hello {userName || "there"},</Text>
            <Text style={styles.text}>
              You’ve used {data?.percentageUsed?.toFixed(1) ?? "0"}% of your
              monthly campus budget. Time to review your spending!
            </Text>

            <Section style={styles.statsContainer}>
              <Section style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>₹{data?.budgetAmount ?? 0}</Text>
              </Section>
              <Section style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>₹{data?.totalExpenses ?? 0}</Text>
              </Section>
              <Section style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>
                  ₹
                  {(data?.budgetAmount ?? 0) - (data?.totalExpenses ?? 0)}
                </Text>
              </Section>
            </Section>

            <Text style={styles.footer}>
              Manage your campus budget smartly with Spend Wise Campus 💡
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  // fallback (just in case)
  return (
    <Html>
      <Body>
        <Text>Invalid email type</Text>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
  },
  title: {
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "18px",
    fontWeight: "600",
    margin: "8px 0",
  },
  text: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "1.4",
    marginBottom: "12px",
  },
  section: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    margin: "24px 0",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "12px",
    padding: "8px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    border: "1px solid #e5e7eb",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "12px",
    borderTop: "1px solid #e5e7eb",
  },
};
