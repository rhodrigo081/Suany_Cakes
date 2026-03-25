import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
    restriction?: "future-only" | "past-only" | "none";
}

export const DatePicker = ({
    date,
    onDateChange,
    restriction = "none" // Valor padrão: permite tudo
}: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        onDateChange(selectedDate);
        if (selectedDate) {
            setIsOpen(false);
        }
    };

    const getDisabledDays = (day: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (restriction === "future-only") {
            return day < today; 
        }
        if (restriction === "past-only") {
            return day > today;
        }
        return false;
    };

    return (
        <div className="flex flex-col gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="tertiary"
                        buttonSize="base"
                        className={cn(
                            "w-full justify-start",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon size={16} />
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={getDisabledDays}
                        locale={ptBR}
                        captionLayout="dropdown"
                        fromYear={2000}
                        toYear={new Date().getFullYear() + 10}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};