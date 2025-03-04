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
      achievements: {
        Row: {
          badge_image_url: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          points: number | null
          requirements: Json | null
          title: string
        }
        Insert: {
          badge_image_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          points?: number | null
          requirements?: Json | null
          title: string
        }
        Update: {
          badge_image_url?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          points?: number | null
          requirements?: Json | null
          title?: string
        }
        Relationships: []
      }
      ai_interactions: {
        Row: {
          created_at: string
          id: string
          interaction_type: string
          metadata: Json | null
          prompt: string
          response: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          interaction_type: string
          metadata?: Json | null
          prompt: string
          response?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          interaction_type?: string
          metadata?: Json | null
          prompt?: string
          response?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string | null
          sender_id: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id?: string | null
          sender_id?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string | null
          sender_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_room_members: {
        Row: {
          joined_at: string
          role: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          role?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          joined_at?: string
          role?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_room_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_private: boolean | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_created_by_fkey"
            columns: ["created_by"]
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
      community_posts: {
        Row: {
          author_id: string
          category: string
          comments_count: number | null
          content: string
          created_at: string
          id: string
          likes_count: number | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          comments_count?: number | null
          content: string
          created_at?: string
          id?: string
          likes_count?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string
          id?: string
          likes_count?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_submissions: {
        Row: {
          competition_id: string | null
          feedback: string | null
          file_url: string | null
          id: string
          participant_id: string | null
          score: number | null
          status: string | null
          submission_content: string | null
          submitted_at: string
        }
        Insert: {
          competition_id?: string | null
          feedback?: string | null
          file_url?: string | null
          id?: string
          participant_id?: string | null
          score?: number | null
          status?: string | null
          submission_content?: string | null
          submitted_at?: string
        }
        Update: {
          competition_id?: string | null
          feedback?: string | null
          file_url?: string | null
          id?: string
          participant_id?: string | null
          score?: number | null
          status?: string | null
          submission_content?: string | null
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_submissions_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_submissions_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          category: string
          created_at: string
          current_participants: number | null
          description: string | null
          difficulty_level: string | null
          end_date: string
          id: string
          max_participants: number | null
          organizer_id: string | null
          prize_description: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          difficulty_level?: string | null
          end_date: string
          id?: string
          max_participants?: number | null
          organizer_id?: string | null
          prize_description?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          current_participants?: number | null
          description?: string | null
          difficulty_level?: string | null
          end_date?: string
          id?: string
          max_participants?: number | null
          organizer_id?: string | null
          prize_description?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitions_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cultural_content: {
        Row: {
          content_type: string
          country: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          language: string
          media_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content_type: string
          country: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          language: string
          media_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          country?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          language?: string
          media_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cultural_content_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          event_id: string | null
          id: string
          registration_date: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          registration_date?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          registration_date?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string | null
          end_date: string
          event_type: string
          id: string
          is_virtual: boolean | null
          location: string | null
          max_participants: number | null
          organizer_id: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_date: string
          event_type: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          end_date?: string
          event_type?: string
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          created_at: string
          friend_id: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          friend_id: string
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          friend_id?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendships_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_read: boolean | null
          type: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          is_read?: boolean | null
          type: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_read?: boolean | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_responses: {
        Row: {
          created_at: string
          id: string
          poll_id: string | null
          selected_option: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          poll_id?: string | null
          selected_option: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          poll_id?: string | null
          selected_option?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_responses_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poll_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          creator_id: string | null
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          options: Json
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          options: Json
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          options?: Json
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string | null
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
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
      student_subject_selections: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          selected_by_id: string
          student_id: string
          subject_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          selected_by_id: string
          student_id: string
          subject_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          selected_by_id?: string
          student_id?: string
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_subject_selections_selected_by_id_fkey"
            columns: ["selected_by_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_subject_selections_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_subject_selections_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      study_group_members: {
        Row: {
          group_id: string
          joined_at: string
          member_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string
          member_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_group_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_groups: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          id: string
          max_members: number | null
          member_count: number | null
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          id?: string
          max_members?: number | null
          member_count?: number | null
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: string
          max_members?: number | null
          member_count?: number | null
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_groups_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_categories: {
        Row: {
          created_at: string
          description: string | null
          educational_level: Database["public"]["Enums"]["educational_level"]
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          educational_level: Database["public"]["Enums"]["educational_level"]
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          educational_level?: Database["public"]["Enums"]["educational_level"]
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          academic_track: Database["public"]["Enums"]["academic_track"] | null
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          subject_type: Database["public"]["Enums"]["subject_type"]
          updated_at: string
        }
        Insert: {
          academic_track?: Database["public"]["Enums"]["academic_track"] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          subject_type: Database["public"]["Enums"]["subject_type"]
          updated_at?: string
        }
        Update: {
          academic_track?: Database["public"]["Enums"]["academic_track"] | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          subject_type?: Database["public"]["Enums"]["subject_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "subject_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
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
      academic_track: "science" | "arts" | "commerce" | "general"
      educational_level:
        | "primary"
        | "junior_secondary"
        | "senior_secondary"
        | "tertiary"
      subject_type: "mandatory" | "optional" | "track_specific"
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
