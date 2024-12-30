import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface ComboboxProps {
  items: Array<{ value: string; label: string }>;
  placeholder: string;
  selectedValue: string | null; // Expect `value` instead of `{ id, label }`
  onSelect: (item: { value: string; label: string } | null) => void;
}

export function Combobox({
  items,
  placeholder,
  selectedValue,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  // Find the selected item by `value`.
  const selectedItem = items.find((item) => item.value === selectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItem ? selectedItem.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => {
                    onSelect(item); // Pass the selected item
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

