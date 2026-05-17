const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Ensure secure cloud context initialization
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

/**
 * FEATURE 1: Autonomous System Risk Evaluation Engine
 * Scans historical relationships to discover systematic delays before matching
 */
async function assessIndustryRiskMetric(industryId) {
  console.log(`\n🔍 Memory Analysis: Computing risk metrics for [${industryId}]...`);
  try {
    const snapshot = await db.collection('academic_linkages')
      .where('actor_industry_id', '==', industryId)
      .get();

    if (snapshot.empty) {
      console.log(`│   -> Clean Record: No historical vulnerabilities found.`);
      return { isHighRisk: false, frictionRate: 0 };
    }

    let totalLinkages = 0;
    let stalledLinkages = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.status === 'stalled' || data.linkage_state === 'logbook_review_deadlock') {
        stalledLinkages++;
      }
      totalLinkages++;
    });

    const frictionRate = (stalledLinkages / totalLinkages) * 100;
    console.log(`│   -> Results: ${stalledLinkages}/${totalLinkages} links encountered deadlocks (${frictionRate.toFixed(1)}%)`);
    
    return {
      isHighRisk: frictionRate >= 50, // Flagged if 50% or more past relationships failed
      frictionRate
    };
  } catch (error) {
    console.error("❌ Risk parsing failure:", error);
    return { isHighRisk: false, frictionRate: 0 };
  }
}

/**
 * FEATURE 2: Scalable Multi-Party Onboarding Pipeline
 * Automatically maps relationships and issues digital handshake tokens 
 */
async function processAutomatedOnboarding(studentPayload) {
  console.log(`\n🚀 Ingesting Student Registration Node: ${studentPayload.name} [${studentPayload.course}]`);

  const defaultHost = "corp_tech_xyz";        // Amanah Tech Ltd
  const backupHost = "corp_fallback_valiant";   // Valiant Venture Partners
  const assignedAdvisor = "adv_computing_02";   // Dr. Siti Nurhaliza

  let chosenHost = defaultHost;
  let operationalStatus = "active";
  let internalState = "awaiting_multi_party_handshake";
  let rulesApplied = ["standard_milestone_tracking", "tokenized_handshake_enabled"];

  // Run the autonomous memory check
  const riskProfile = await assessIndustryRiskMetric(defaultHost);

  if (riskProfile.isHighRisk) {
    console.log(`⚠️  PREDICTIVE OVERRIDE ACTIVATED: Default host risk matches failure threshold.`);
    console.log(`🔀 System is rerouting placement vector to agile partner node [${backupHost}]`);
    chosenHost = backupHost;
    operationalStatus = "at-risk";
    internalState = "fallback_routing_activated";
    rulesApplied.push("predictive_override_executed");
  } else {
    console.log(`✅ Default placement pathway cleared safe by the engine.`);
    rulesApplied.push("escalate_to_hod_if_logbook_stalls_7d");
  }

  const uniqueLinkId = `lnk_scale_${Date.now().toString().slice(-4)}`;

  // Multi-party digital validation contract ledger
  const scalableLinkagePayload = {
    linkage_id: uniqueLinkId,
    actor_student_id: studentPayload.id,
    actor_advisor_id: assignedAdvisor,
    actor_industry_id: chosenHost,
    status: operationalStatus,
    linkage_state: internalState,
    platform_logic_applied: rulesApplied,
    
    // Eliminates manual entries: System updates these flags dynamically via secure endpoints
    handshake_ledger: {
      student_signed: true,          // Pre-verified on registration
      advisor_approved: false,       // Pending dashboard button action
      industry_accepted: false       // Pending company portal acceptance
    },
    
    historical_interactions: [
      {
        date: new Date().toISOString(),
        type: "automated_pipeline_generation",
        notes: `Linkage compiled cleanly. Predictive analysis framework checked operational latencies.`
      }
    ],
    created_at: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection('academic_linkages').doc(uniqueLinkId).set(scalableLinkagePayload);
    console.log(`💾 Live Grid Update: Linkage Profile [${uniqueLinkId}] deployed to Cloud Firestore.`);
  } catch (err) {
    console.error("❌ Failed to push scalable node allocation:", err);
  }
}

/**
 * FEATURE 3: Bulk CSV Batch Ingesting Pipeline
 * Simulates processing hundreds of spreadsheet student items concurrently
 */
async function runBulkIngestionSimulation() {
  console.log("\n================================================================");
  console.log("📥 ACTIVATING ENTERPRISE COHORT BULK INGESTION BATCH PIPELINE");
  console.log("================================================================");

  // Simulated spreadsheet upload
  const rawCohortSpreadsheet = [
    { id: "stu_se_8888", name: "Ahmad Dani", course: "Software Engineering" },
    { id: "stu_data_77", name: "Zulhelmi Rosli", course: "Data Science" },
    { id: "stu_cs_4432", name: "Sarah Connor", course: "Cyber Security" }
  ];

  for (const student of rawCohortSpreadsheet) {
    await processAutomatedOnboarding(student);
  }

  console.log("\n================================================================");
  console.log("🏁 BULK BATCH PIPELINE RUN COMPLETE. CHECK WEB WORKSPACE.");
  console.log("================================================================");
  process.exit(0);
}

// Trigger processing loop
runBulkIngestionSimulation();