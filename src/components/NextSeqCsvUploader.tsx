import React, { useState } from "react";
import { Upload, X, CheckCircle2, FileSpreadsheet, AlertCircle } from "lucide-react";
import { parseSampleConsolidatedCsv, parseExonFragilityCsv } from "../utils/nextseqCsvParser";
import { SampleConsolidatedEntry, ExonFragilityEntry } from "../types/nextseq";

interface NextSeqCsvUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onSamplesLoaded: (samples: SampleConsolidatedEntry[]) => void;
  onExonsLoaded: (exons: ExonFragilityEntry[]) => void;
}

export const NextSeqCsvUploader: React.FC<NextSeqCsvUploaderProps> = ({
  isOpen,
  onClose,
  onSamplesLoaded,
  onExonsLoaded,
}) => {
  const [sampleFileName, setSampleFileName] = useState<string | null>(null);
  const [exonFileName, setExonFileName] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSampleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSampleFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseSampleConsolidatedCsv(text);
      if (parsed.length > 0) {
        onSamplesLoaded(parsed);
        setUploadNotice(`Chargement réussi : ${parsed.length} échantillons depuis ${file.name}`);
      } else {
        setUploadNotice(`Attention : Aucun échantillon valide trouvé dans ${file.name}`);
      }
    };
    reader.readAsText(file);
  };

  const handleExonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExonFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseExonFragilityCsv(text);
      if (parsed.length > 0) {
        onExonsLoaded(parsed);
        setUploadNotice(`Chargement réussi : ${parsed.length} exons récalcitrants depuis ${file.name}`);
      } else {
        setUploadNotice(`Attention : Aucun exon valide trouvé dans ${file.name}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
            <span>Charger vos Fichiers CSV d'Analyse NextSeq2000</span>
          </h3>
          <p className="text-xs text-slate-500">
            Importez <code>FINAL_SAMPLES_CONSOLIDATED.csv</code> et <code>INTERSECT_EXON_FRAGILITY.csv</code> pour mettre à jour immédiatement les dashboards et filtres.
          </p>
        </div>

        {uploadNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{uploadNotice}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* File 1: FINAL_SAMPLES_CONSOLIDATED.csv */}
          <div className="p-4 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl bg-slate-50 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-slate-900">1. Métriques Échantillons Globaux</div>
                <div className="text-[11px] text-slate-500">FINAL_SAMPLES_CONSOLIDATED.csv</div>
              </div>
              <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center space-x-1.5">
                <Upload className="h-3.5 w-3.5" />
                <span>Parcourir</span>
                <input type="file" accept=".csv" onChange={handleSampleFileUpload} className="hidden" />
              </label>
            </div>
            {sampleFileName && (
              <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Fichier chargé : {sampleFileName}</span>
              </div>
            )}
          </div>

          {/* File 2: INTERSECT_EXON_FRAGILITY.csv */}
          <div className="p-4 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl bg-slate-50 transition-colors space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-slate-900">2. Dictionnaire de Fragilité Exonique</div>
                <div className="text-[11px] text-slate-500">INTERSECT_EXON_FRAGILITY.csv</div>
              </div>
              <label className="cursor-pointer bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all flex items-center space-x-1.5">
                <Upload className="h-3.5 w-3.5" />
                <span>Parcourir</span>
                <input type="file" accept=".csv" onChange={handleExonFileUpload} className="hidden" />
              </label>
            </div>
            {exonFileName && (
              <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Fichier chargé : {exonFileName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
          >
            Fermer et Voir les Analyses
          </button>
        </div>
      </div>
    </div>
  );
};
