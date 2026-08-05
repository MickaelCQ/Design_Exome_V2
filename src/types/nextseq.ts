export interface SampleConsolidatedEntry {
  Sample_Platform: string;
  Normalized_ID: string;
  RefSeq_MeanDepth: number;
  Intersect_MeanDepth: number;
  RefSeq_ZeroCov_Pct: number;
  Int_ZeroCov_Pct: number;
  Fastq_error_rate: number;
  avg_duplication_rate: number;
  DUP_PERCENT: number;
  DUP_STATS: number;
  insert_size_average: number;
  hs_AT_DROPOUT: number;
  hs_GC_DROPOUT: number;
  Int_MeanDepth: number;
  Int_Fold80: number;
  Int_Pct30X: number;
  Efficiency_Delta_Fold80: number;
  Diagnostic_Yield_Ratio: number;
  // Computed helpers
  kit: string;
  sample_id: string;
}

export interface ExonFragilityRawEntry {
  Normalized_ID: string;
  Platform: "Agilent" | "Illumina" | string;
  exon_id: string;
  chrom: string;
  start: number;
  end: number;
  depth: number;
  Rank_Percentile: number;
  Criticality_Status: string;
  hs_GC_DROPOUT: number;
  DUP_PE: number;
}

export interface ExonFragilityEntry {
  exon_id: string;
  gene_symbol: string;
  chr_pos: string;
  exon_number: string;
  transcript_id: string;
  gc_content_pct: number;
  agilent_depth: number;
  illumina_depth: number;
  agilent_criticality: string;
  illumina_criticality: string;
  agilent_rank_percentile: number;
  illumina_rank_percentile: number;
  rank_percentile: number;
  pathology_category: string;
  design_notes: string;
}

export interface CallabilityCdfPoint {
  percentile: number; // 0 to 100%
  agilentDepth: number;
  illuminaDepth: number;
}
