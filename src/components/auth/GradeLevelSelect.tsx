import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface GradeLevelSelectProps {
  control: Control<any>;
  name: string;
}

const GradeLevelSelect = ({ control, name }: GradeLevelSelectProps) => {
  const gradeLevels = {
    "Primary School": Array.from({ length: 6 }, (_, i) => `Primary ${i + 1}`),
    "Junior Secondary": Array.from({ length: 3 }, (_, i) => `JS ${i + 1}`),
    "Senior Secondary": Array.from({ length: 3 }, (_, i) => `SS ${i + 1}`),
    "University": Array.from({ length: 4 }, (_, i) => `Year ${i + 1}`),
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Grade Level</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your grade" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(gradeLevels).map(([category, levels]) => (
                <div key={category}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                    {category}
                  </div>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GradeLevelSelect;