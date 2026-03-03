import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

class Formartters {
  formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  maskPhone(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  clearMask(value: string) {
    return value.replace(/\D/g, "");
  }

  formatDate(dateString: string) {
  if (!dateString) return "Data não disponível";

  return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}
}

export const formatters = new Formartters();
