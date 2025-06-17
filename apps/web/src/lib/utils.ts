import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDomainFromURL(url: string) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.hostname.replace(/^www\./, "");
	} catch (error) {
		console.error("Invalid URL:", error);
		return url;
	}
}
