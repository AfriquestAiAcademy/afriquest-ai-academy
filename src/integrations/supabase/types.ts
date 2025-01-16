export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assignment_submissions: {
        Row: {
          assignment_id: string | null
          content: string | null
          feedback: string | null
          file_path: string | null
          grade: number | null
          id: string
          student_id: string | null
          submitted_at: string
        }
        Insert: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          file_path?: string | null
          grade?: number | null
          id?: string
          student_id?: string | null
          submitted_at?: string
        }
        Update: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          file_path?: string | null
          grade?: number | null
          id?: string
          student_id?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          class_id: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          teacher_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          teacher_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          teacher_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_enrollments: {
        Row: {
          class_id: string | null
          id: string
          joined_at: string
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          id?: string
          joined_at?: string
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          id?: string
          joined_at?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          description: string | null
          grade_level: string | null
          id: string
          name: string
          subject: string | null
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          grade_level?: string | null
          id?: string
          name: string
          subject?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          grade_level?: string | null
          id?: string
          name?: string
          subject?: string | null
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          child_details: Json | null
          country: string | null
          created_at: string
          education_level: string | null
          full_name: string | null
          grade_level: string | null
          id: string
          role: string | null
          student_ids: string[] | null
          subjects_of_interest: string[] | null
          subjects_taught: string[] | null
          updated_at: string
          username: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          child_details?: Json | null
          country?: string | null
          created_at?: string
          education_level?: string | null
          full_name?: string | null
          grade_level?: string | null
          id: string
          role?: string | null
          student_ids?: string[] | null
          subjects_of_interest?: string[] | null
          subjects_taught?: string[] | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          child_details?: Json | null
          country?: string | null
          created_at?: string
          education_level?: string | null
          full_name?: string | null
          grade_level?: string | null
          id?: string
          role?: string | null
          student_ids?: string[] | null
          subjects_of_interest?: string[] | null
          subjects_taught?: string[] | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      resource_shares: {
        Row: {
          class_id: string | null
          id: string
          resource_id: string | null
          shared_at: string
        }
        Insert: {
          class_id?: string | null
          id?: string
          resource_id?: string | null
          shared_at?: string
        }
        Update: {
          class_id?: string | null
          id?: string
          resource_id?: string | null
          shared_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_shares_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_shares_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          created_at: string
          description: string | null
          file_path: string
          file_type: string
          id: string
          is_public: boolean | null
          teacher_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path: string
          file_type: string
          id?: string
          is_public?: boolean | null
          teacher_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string
          file_type?: string
          id?: string
          is_public?: boolean | null
          teacher_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          badges: string[] | null
          created_at: string
          id: string
          level: number | null
          points: number | null
          student_id: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          badges?: string[] | null
          created_at?: string
          id?: string
          level?: number | null
          points?: number | null
          student_id?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          badges?: string[] | null
          created_at?: string
          id?: string
          level?: number | null
          points?: number | null
          student_id?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
