
class CalendarComponent {
    // private readonly page: Page;
    public selector: string;
    public static DATE_FORMAT: string = 'YYYY-MM-DD';
    
    constructor(selector: string) {
        this.selector = selector;
    }

    dateIsValid(dateString: string): boolean {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        return dateRegex.test(dateString);
    }

    toISOString( date:DateObject ): string {
        const { year, month, day } = date;
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

}

