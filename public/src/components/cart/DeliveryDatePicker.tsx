import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DeliveryDatePickerProps {
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
}

export const DeliveryDatePicker = ({ date, onDateChange }: DeliveryDatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        onDateChange(selectedDate);
        if (selectedDate) {
            setIsOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Data de Entrega</label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={(date) => date < new Date()}
                        locale={ptBR}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};