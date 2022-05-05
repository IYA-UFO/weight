interface Record {
  weight: number;
  date: Date;
  weekId: string;
}

interface Week {
  weekId: string;
  averageWeight: number;
  firstDay: string;
  records: Record[];
}

export default interface PastWeight {
  weeks: Week[];
  maxWeight: number;
  minWeight: number;
  ticks: number[];
  records: Record[];
}
