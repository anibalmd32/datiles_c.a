interface PriceSectionProps {
    label: string;
    value: { usd: number; bs: number };
}

export function PriceSection({ label, value }: PriceSectionProps) {
    return (
        <div>
            <span className="font-medium">{label}:</span>
            <div className="mt-1 p-2 bg-muted rounded-md">
                USD: ${value.usd.toFixed(2)} (Bs. {value.bs.toFixed(2)})
            </div>
        </div>
    );
}