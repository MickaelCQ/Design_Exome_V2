import React, { useState } from "react";
import { SampleConsolidatedEntry, ExonFragilityEntry } from "../types/nextseq";
import { NextSeqGlobalDashboard } from "./NextSeqGlobalDashboard";
import { NextSeqFragilityMap } from "./NextSeqFragilityMap";
import { NextSeqCsvUploader } from "./NextSeqCsvUploader";
import { BarChart2, ShieldAlert, Upload, Sparkles } from "lucide-react";

interface DeepMetricOptimizerProps {
  initialSection?: "global" | "fragility";
  samplesData: SampleConsolidatedEntry[];
  exonData: ExonFragilityEntry[];
  onSamplesLoaded: (samples: SampleConsolidatedEntry[]) => void;
  onExonsLoaded: (exons: ExonFragilityEntry[]) => void;
}

export const DeepMetricOptimizer: React.FC<DeepMetricOptimizerProps> = ({
  initialSection = "global",
  samplesData,
  exonData,
  onSamplesLoaded,
  onExonsLoaded,
}) => {
  const [activeSection, setActiveSection] = useState<"global" | "fragility">(initialSection);
  const [showCsvUploader, setShowCsvUploader] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Sub-navigation Switcher Bar */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveSection("global")}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all w-1/2 sm:w-auto ${
              activeSection === "global"
                ? "bg-slate-900 text-sky-400 shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>SECTION 1 : Dashboard Global</span>
          </button>

          <button
            onClick={() => setActiveSection("fragility")}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all w-1/2 sm:w-auto ${
              activeSection === "fragility"
                ? "bg-slate-900 text-sky-400 shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>SECTION 2 : Fragility Map Exons</span>
          </button>
        </div>

        {/* CSV Import Button */}
        <button
          onClick={() => setShowCsvUploader(true)}
          className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all border border-slate-700 self-end sm:self-auto"
        >
          <Upload className="h-3.5 w-3.5 text-sky-400" />
          <span>Charger CSV d'Analyse</span>
        </button>
      </div>

      {/* Render Active Section */}
      {activeSection === "global" ? (
        <NextSeqGlobalDashboard
          samplesData={samplesData}
          onUploadClick={() => setShowCsvUploader(true)}
        />
      ) : (
        <NextSeqFragilityMap
          exonData={exonData}
          onUploadClick={() => setShowCsvUploader(true)}
        />
      )}

      {/* CSV File Uploader Modal */}
      <NextSeqCsvUploader
        isOpen={showCsvUploader}
        onClose={() => setShowCsvUploader(false)}
        onSamplesLoaded={onSamplesLoaded}
        onExonsLoaded={onExonsLoaded}
      />
    </div>
  );
};
